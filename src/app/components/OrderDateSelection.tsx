import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Box, CircularProgress, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface OrderDateSelectionProps {
  orderDate: Dayjs | null;
  setOrderDate: (date: Dayjs | null) => void;
  fetchDailyOrderCount: (date: Dayjs | null) => void;
  dailyOrderCount: number | null;
  loadingCount: boolean;
  MAX_DAILY_ORDERS: number;
  shouldDisableDate: (date: Dayjs) => boolean;
  APP_TIMEZONE: string;
}

export default function OrderDateSelection({
  orderDate,
  setOrderDate,
  fetchDailyOrderCount,
  dailyOrderCount,
  loadingCount,
  MAX_DAILY_ORDERS,
  shouldDisableDate,
  APP_TIMEZONE,
}: OrderDateSelectionProps) {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mb: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <DatePicker
        label="Select Order Date"
        value={orderDate}
        onChange={(newValue) => {
          setOrderDate(newValue);
          fetchDailyOrderCount(newValue);
        }}
        minDate={dayjs().add(1, "day").tz(APP_TIMEZONE)}
        shouldDisableDate={shouldDisableDate}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Order at least one day in advance. (Weekends & Holidays are disabled)
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="p" sx={{ mr: 2 }}>
          Daily Order Limit: {MAX_DAILY_ORDERS}
        </Typography>
        {loadingCount ? (
          <CircularProgress size={24} />
        ) : (
          dailyOrderCount !== null && (
            <Typography variant="subtitle1" color="primary">
              {MAX_DAILY_ORDERS - dailyOrderCount} spots remaining for today!
            </Typography>
          )
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        Orders are fulfilled on a first-come, first-served basis.
      </Typography>
    </Box>
  );
}
