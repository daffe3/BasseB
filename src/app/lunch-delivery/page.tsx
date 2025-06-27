"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Snackbar, Alert, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import OrderDateSelection from "../components/OrderDateSelection";
import OrderForm from "../components/OrderForm";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const APP_TIMEZONE = "Europe/Stockholm";
const MAX_DAILY_ORDERS = 40;
const availableLunchOptions = ["Chicken", "Fish", "Vegetarian", "Meat"];

export default function LunchDeliveryPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lunchOption, setLunchOption] = useState("Chicken");
  const [quantity, setQuantity] = useState(1);
  const [orderDate, setOrderDate] = useState<Dayjs | null>(
    dayjs().add(1, "day").tz(APP_TIMEZONE)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [dailyOrderCount, setDailyOrderCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [publicHolidays, setPublicHolidays] = useState<Dayjs[]>([]);

  useEffect(() => {
    const fetchPublicHolidays = async () => {
      try {
        const response = await fetch("/api/holidays");
        if (response.ok) {
          const data: string[] = await response.json();
          setPublicHolidays(
            data.map((dateStr) => dayjs(dateStr).tz(APP_TIMEZONE))
          );
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch public holidays:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching public holidays:", error);
      }
    };
    fetchPublicHolidays();
  }, []);

  const fetchDailyOrderCount = useCallback(async (date: Dayjs | null) => {
    if (!date) return;
    setLoadingCount(true);
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      const response = await fetch(`/api/orders-count?date=${formattedDate}`);
      if (response.ok) {
        const data = await response.json();
        setDailyOrderCount(data.count);
      } else {
        const errorData = await response.json();
        setSnackbarMessage(`Failed to fetch order count: ${errorData.message}`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setDailyOrderCount(null);
      }
    } catch (error) {
      console.error("Error fetching daily order count:", error);
      setSnackbarMessage("Error fetching daily order count.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setDailyOrderCount(null);
    } finally {
      setLoadingCount(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyOrderCount(orderDate);
  }, [orderDate, fetchDailyOrderCount]);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingOrder(true);

    if (!orderDate) {
      setSnackbarMessage("Please select a valid order date.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSubmittingOrder(false);
      return;
    }

    const orderData = {
      name,
      email,
      lunchOption,
      quantity,
      address,
      orderDate: orderDate.format("YYYY-MM-DD"),
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        await response.json();
        setSnackbarMessage("Order placed successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setName("");
        setEmail("");
        setAddress("");
        setQuantity(1);
        setOrderDate(dayjs().add(1, "day").tz(APP_TIMEZONE));
      } else {
        const errorData = await response.json();
        setSnackbarMessage(`Order failed: ${errorData.message}`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbarMessage("Order failed: An unexpected error occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmittingOrder(false);
    }
  };

  const isPublicHoliday = (date: Dayjs): boolean => {
    return publicHolidays.some((holiday) => holiday.isSame(date, "day"));
  };

  const shouldDisableDate = (date: Dayjs): boolean => {
    const today = dayjs().tz(APP_TIMEZONE).startOf("day");
    const selectedDate = date.tz(APP_TIMEZONE).startOf("day");

    if (selectedDate.isSameOrBefore(today, "day")) {
      return true;
    }

    if (selectedDate.day() === 0 || selectedDate.day() === 6) {
      return true;
    }

    if (isPublicHoliday(selectedDate)) {
      return true;
    }

    return false;
  };

  const isSubmitDisabled =
    submittingOrder || !orderDate || shouldDisableDate(orderDate);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Daily Lunch Delivery Service
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Enjoy fresh, delicious lunches delivered directly to your workplace or
        home.
      </Typography>

      <OrderDateSelection
        orderDate={orderDate}
        setOrderDate={setOrderDate}
        fetchDailyOrderCount={fetchDailyOrderCount}
        dailyOrderCount={dailyOrderCount}
        loadingCount={loadingCount}
        MAX_DAILY_ORDERS={MAX_DAILY_ORDERS}
        shouldDisableDate={shouldDisableDate}
        APP_TIMEZONE={APP_TIMEZONE}
      />

      <OrderForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        address={address}
        setAddress={setAddress}
        lunchOption={lunchOption}
        setLunchOption={setLunchOption}
        quantity={quantity}
        setQuantity={setQuantity}
        availableLunchOptions={availableLunchOptions}
        submittingOrder={submittingOrder}
        handleSubmit={handleSubmit}
        isSubmitDisabled={isSubmitDisabled}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}