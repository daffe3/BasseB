import React from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from "@mui/material";

interface OrderFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  lunchOption: string;
  setLunchOption: (value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  availableLunchOptions: string[];
  handleSubmit: (event: React.FormEvent) => void;
  isSubmitDisabled: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({
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
  handleSubmit,
  isSubmitDisabled,
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Lunch Option</InputLabel>
            <Select
              value={lunchOption}
              label="Lunch Option"
              onChange={(e) => setLunchOption(e.target.value as string)}
            >
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
              {availableLunchOptions.map((option) => (
                <MenuItem key={option} value={option.toLowerCase()}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Today&apos;s delicious choices!</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            inputProps={{
              min: 1,
            }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitDisabled}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderForm;