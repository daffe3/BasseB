"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { useInquiryForm } from "../hooks/useInquiryForm";

export default function InquiryForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    statusMessage,
    isSubmitting,
    errors,
  } = useInquiryForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: "background.paper",
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <TextField
        label="Your Name"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange(e, "name")}
        required
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange(e, "email")}
        required
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Phone Number (Optional)"
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange(e, "phone")}
        fullWidth
        margin="normal"
      />

      <DatePicker
        label="Preferred Event Date"
        value={formData.eventDate ?? null}
        onChange={(newValue) => handleChange(newValue, undefined)}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            required: true,
            error: !!errors.eventDate,
            helperText: errors.eventDate,
          },
        }}
        minDate={dayjs()}
      />

      <FormControl
        fullWidth
        margin="normal"
        required
        error={!!errors.eventType}
      >
        <InputLabel id="eventType-label">Type of Event</InputLabel>
        <Select
          labelId="eventType-label"
          id="eventType"
          name="eventType"
          value={formData.eventType ?? ""}
          onChange={(e) => handleChange(e, "eventType")}
          label="Type of Event"
        >
          <MenuItem value="">-- Select an Option --</MenuItem>
          <MenuItem value="wedding">Wedding</MenuItem>
          <MenuItem value="corporate">Corporate Event</MenuItem>
          <MenuItem value="birthday">Birthday Party</MenuItem>
          <MenuItem value="private">Private Gathering</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        {errors.eventType && (
          <Typography
            color="error"
            variant="caption"
            sx={{ ml: 2, mt: 0.5, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {errors.eventType}
          </Typography>
        )}
      </FormControl>

      <TextField
        label="Number of Guests"
        id="numGuests"
        name="numGuests"
        type="number"
        value={formData.numGuests}
        onChange={(e) => handleChange(e, "numGuests")}
        inputProps={{ min: "1" }}
        required
        fullWidth
        margin="normal"
        error={!!errors.numGuests}
        helperText={errors.numGuests}
      />

      <TextField
        label="Estimated Budget (Optional)"
        id="budget"
        name="budget"
        type="text"
        value={formData.budget}
        onChange={(e) => handleChange(e, "budget")}
        placeholder="e.g., $500 - $1000 or per person"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Additional Details/Requests"
        id="message"
        name="message"
        value={formData.message}
        onChange={(e) => handleChange(e, "message")}
        multiline
        rows={5}
        fullWidth
        margin="normal"
        placeholder="Tell us about your preferences, dietary restrictions, specific menu ideas, etc."
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
        sx={{
          mt: { xs: 2, md: 3 },
          py: { xs: 1, sm: 1.25, md: 1.5 },
          px: { xs: 3, sm: 4, md: 5 },
          borderRadius: 9999,
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.125rem" },
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Submit Inquiry"
        )}
      </Button>

      {statusMessage && (
        <Alert severity={statusMessage.type} sx={{ mt: { xs: 3, md: 4 } }}>
          {statusMessage.message}
        </Alert>
      )}
    </Box>
  );
}
