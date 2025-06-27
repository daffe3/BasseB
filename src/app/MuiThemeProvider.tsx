"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.75,
    },
  },
  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 6px 16px",
          },
        },
      },
    },
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
