import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface OrderConfirmationSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

const OrderConfirmationSnackbar: React.FC<OrderConfirmationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default OrderConfirmationSnackbar;
