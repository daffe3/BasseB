import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

interface OrderFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  address: string;
  setAddress: (address: string) => void;
  lunchOption: string;
  setLunchOption: (option: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  availableLunchOptions: string[];
  submittingOrder: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitDisabled: boolean;
}

export default function OrderForm({
  name,
  setName,
  email,
  setEmail,
  address,
  setAddress,
  lunchOption,
  setLunchOption,
  quantity,
  setQuantity,
  availableLunchOptions,
  submittingOrder,
  handleSubmit,
  isSubmitDisabled,
}: OrderFormProps) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <TextField
        label="Your Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Your Email"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Delivery Address"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          select
          label="Lunch Option"
          value={lunchOption}
          onChange={(e) => setLunchOption(e.target.value)}
          fullWidth
          required
        >
          {availableLunchOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          inputProps={{ min: 1 }}
          fullWidth
          required
        />
      </Box>
      <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
        Today's delicious choices!
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, py: 1.5 }}
        disabled={isSubmitDisabled}
      >
        {submittingOrder ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Place Order"
        )}
      </Button>
    </Box>
  );
}
