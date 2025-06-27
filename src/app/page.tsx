"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 400, md: 500, lg: 600 },
          backgroundImage: "url('/images/catering-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1, color: "white" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "extrabold",
              mb: { xs: 2, md: 4 },
              animation: "fadeIn 1s ease-out forwards",
              fontSize: { xs: "2.25rem", sm: "3rem", md: "4.5rem" },
            }}
          >
            Delicious Catering for Your Next Event
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 4, md: 6 },
              animation: "fadeIn 1s ease-out 0.1s forwards",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Bringing fresh, flavorful, and unforgettable culinary experiences
            directly to you.
          </Typography>
          <Button
            component={Link}
            href="/inquiry"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 9999,
              py: { xs: 1, md: 1.5 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              boxShadow: 3,
              transform: "scale(1)",
              transition:
                "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              animation: "fadeIn 1s ease-out 0.2s forwards",
            }}
          >
            Get a Free Quote
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "100%", md: "md", lg: "lg" },
          mx: "auto",
          p: { xs: 3, md: 6 },
          my: { xs: 4, md: 8, lg: 12 },
          bgcolor: "background.paper",
          borderRadius: "lg",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, md: 3 },
            color: "text.primary",
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
          }}
        >
          About Basse Brodd Cool Kid
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            mb: { xs: 3, md: 4 },
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.125rem" },
            maxWidth: { xs: "100%", md: "75%", lg: "60%" },
            mx: "auto",
          }}
        >
          At Basse Brodd house, we believe that great food is the heart of every
          memorable event. With years of experience and a passion for culinary
          excellence, we craft bespoke menus that delight the senses and
          perfectly complement your occasion. From intimate gatherings to grand
          celebrations, our commitment to quality ingredients, innovative
          dishes, and impeccable service ensures a truly unforgettable
          experience for you and your guests.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 3, md: 4, lg: 6 },
            mt: { xs: 4, md: 6 },
          }}
        >
          <Card
            raised
            sx={{
              borderRadius: "lg",
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: "semibold",
                  mb: { xs: 1, md: 1.5 },
                  color: "primary.main",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                }}
              >
                Custom Menus
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Tailored to your taste, dietary needs, and event theme, ensuring
                a unique and personalized experience for every guest.
              </Typography>
            </CardContent>
          </Card>
          <Card
            raised
            sx={{
              borderRadius: "lg",
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: "semibold",
                  mb: { xs: 1, md: 1.5 },
                  color: "primary.main",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                }}
              >
                Fresh Ingredients
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Sourced locally whenever possible for the highest quality and
                freshest flavors, guaranteeing an exquisite culinary delight.
              </Typography>
            </CardContent>
          </Card>
          <Card
            raised
            sx={{
              borderRadius: "lg",
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: "semibold",
                  mb: { xs: 1, md: 1.5 },
                  color: "primary.main",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                }}
              >
                Professional Service
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                A dedicated team ensuring a seamless, delightful, and
                stress-free catering experience from planning to execution.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
