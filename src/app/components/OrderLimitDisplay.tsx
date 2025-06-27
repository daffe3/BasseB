import React from "react";
import { Box, Typography, FormHelperText, Paper } from "@mui/material";

interface OrderLimitDisplayProps {
  maxOrders: number;
  availableOrders: number;
  isLimitReached: boolean;
}

const OrderLimitDisplay: React.FC<OrderLimitDisplayProps> = ({
  maxOrders,
  availableOrders,
  isLimitReached,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Daily Order Limit: {maxOrders}
        </Typography>
        <Typography
          variant="h6"
          color={isLimitReached ? "error.main" : "primary.main"}
        >
          {isLimitReached ? (
            <strong>Limit Reached for Today!</strong>
          ) : (
            <strong>{availableOrders} spots remaining for today!</strong>
          )}
        </Typography>
        <FormHelperText sx={{ mt: 1 }}>
          Orders are fulfilled on a first-come, first-served basis.
        </FormHelperText>
      </Box>
    </Paper>
  );
};

export default OrderLimitDisplay;
