"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Snackbar, Alert, Typography, Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import OrderDateSelection from "../components/OrderDateSelection";
import OrderForm from "../components/OrderForm";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const APP_TIMEZONE = "Europe/Stockholm";
const MAX_DAILY_ORDERS = 40;
const availableLunchOptions = ["Chicken", "Veggie", "Fish", "Meat"];

export default function LunchOrderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lunchOption, setLunchOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderDate, setOrderDate] = useState<Dayjs | null>(null);
  const [dailyOrderCount, setDailyOrderCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [loadingHolidays, setLoadingHolidays] = useState<boolean>(true);
  const [fetchHolidaysError, setFetchHolidaysError] = useState<string | null>(
    null
  );
  const [submittingOrder, setSubmittingOrder] = useState<boolean>(false);
  const [orderMessage, setOrderMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoadingHolidays(true);
        setFetchHolidaysError(null);
        const response = await fetch("/api/holidays");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
        setFetchHolidaysError("Failed to load holidays. Please try again later.");
      } finally {
        setLoadingHolidays(false);
      }
    };

    fetchHolidays();
  }, []);

  const shouldDisableDate = useCallback(
    (date: Dayjs) => {
      const day = date.day();
      const isWeekend = day === 0 || day === 6;
      const isHoliday = holidays.some((holiday) =>
        dayjs(holiday).tz(APP_TIMEZONE).isSame(date, "day")
      );
      return isWeekend || isHoliday;
    },
    [holidays]
  );

  const fetchDailyOrderCount = useCallback(
    async (date: Dayjs | null) => {
      if (!date) {
        setDailyOrderCount(null);
        return;
      }

      setLoadingCount(true);
      try {
        const formattedDate = date.format("YYYY-MM-DD");
        const response = await fetch(`/api/order?date=${formattedDate}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDailyOrderCount(data.count);
      } catch (error) {
        console.error("Failed to fetch daily order count:", error);
        setDailyOrderCount(null);
      } finally {
        setLoadingCount(false);
      }
    },
    []
  );

  useEffect(() => {
    if (orderDate) {
      fetchDailyOrderCount(orderDate);
    }
  }, [orderDate, fetchDailyOrderCount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!orderDate) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please select an order date.");
      setSnackbarOpen(true);
      return;
    }

    if (dailyOrderCount !== null && dailyOrderCount >= MAX_DAILY_ORDERS) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Daily order limit reached for the selected date.");
      setSnackbarOpen(true);
      return;
    }

    setSubmittingOrder(true);
    setOrderMessage(null);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          address,
          lunchOption,
          quantity,
          orderDate: orderDate.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Order placed successfully!");
      setSnackbarOpen(true);

      setName("");
      setEmail("");
      setAddress("");
      setLunchOption("");
      setQuantity(1);
      setOrderDate(null);
      setDailyOrderCount(null);
    } catch (error: unknown) { 
      console.error("Order submission failed:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Order failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setSnackbarOpen(true);
    } finally {
      setSubmittingOrder(false);
      if (orderDate) {
        fetchDailyOrderCount(orderDate);
      }
    }
  };

  const isSubmitDisabled =
    !orderDate ||
    name === "" ||
    email === "" ||
    address === "" ||
    lunchOption === "" ||
    quantity <= 0 ||
    submittingOrder ||
    (dailyOrderCount !== null && dailyOrderCount >= MAX_DAILY_ORDERS);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Lunch Order Form
        </Typography>

        {fetchHolidaysError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {fetchHolidaysError}
          </Alert>
        )}
        {orderMessage && (
          <Alert severity={orderMessage.type} sx={{ mb: 2 }}>
            {orderMessage.text}
          </Alert>
        )}

        <OrderDateSelection
          orderDate={orderDate}
          setOrderDate={setOrderDate}
          fetchDailyOrderCount={fetchDailyOrderCount}
          dailyOrderCount={dailyOrderCount}
          loadingCount={loadingCount || loadingHolidays}
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
      </Container>
    </LocalizationProvider>
  );
}