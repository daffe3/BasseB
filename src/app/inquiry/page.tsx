"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InquiryForm from "../components/InquiryForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function InquiryPage() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: { xs: "95%", sm: "md", lg: "lg" },
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          my: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, md: 3 },
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
          }}
        >
          Förfrågningsformulär för catering
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{
            mb: { xs: 3, md: 4 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            maxWidth: { xs: "100%", sm: "90%", md: "75%" },
            mx: "auto",
          }}
        >
          Fyll i formuläret nedan med information om ditt evenemang, så hör vi
          av oss med en personlig offert.
        </Typography>
        <InquiryForm />
      </Box>
    </LocalizationProvider>
  );
}
