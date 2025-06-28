"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ContactPage() {
  return (
    <Box
      sx={{
        maxWidth: { xs: "95%", sm: "md", lg: "lg" },
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        mt: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: { xs: 2, md: 3 },
          fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
        }}
      >
        Contact Us
      </Typography>

      <Box
        sx={{
          mb: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: 120, sm: 150, md: 180 },
            height: { xs: 120, sm: 150, md: 180 },
            borderRadius: "50%",
            bgcolor: "grey.200",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            overflow: "hidden",
          }}
        >
          <img
            src="/public/images/basse-kock.png"
            alt="Basse Brodd & Owner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "medium",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Basse Brodd &amp; Owner
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        Have questions or need a custom quote? We&apos;re here to help!
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: { xs: 0.5, md: 1 }, fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        **Email:**{" "}
        <a href="mailto:bassebrodd@gmail.com">Bassebrodd@gmail.com</a>
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: { xs: 2.5, md: 3 }, fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        **Phone:** <a href="tel:+1234567890">+46 Bassenr</a>
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: "1rem", sm: "1.125rem" },
        }}
      >
        Follow Us:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          flexWrap: "wrap",
        }}
      >
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/social-facebook.png"
            alt="Facebook"
            style={{ width: 40, height: 40 }}
          />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/social-instagram.png"
            alt="Instagram"
            style={{ width: 40, height: 40 }}
          />
        </a>
      </Box>
    </Box>
  );
}