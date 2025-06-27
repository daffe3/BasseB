"use client";

// Temporary comment to trigger deploy
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import MuiLocalizationProvider from "./components/MuiLocalizationProvider";
import MuiThemeProvider from "./MuiThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProvider>
          <MuiLocalizationProvider>
            <Header />
            <Box
              component="main"
              sx={{ flexGrow: 1, minHeight: "calc(100vh - 64px - 96px)" }}
            >
              {children}
            </Box>
            <Footer />
          </MuiLocalizationProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
