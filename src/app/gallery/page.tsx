"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import GalleryItem from "../components/GalleryItem";
import GalleryPagination from "../components/GalleryPagination";
import ImageModal from "../components/ImageModal";

const allGalleryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Placeholder Photo ${i + 1}`,
  imageSrc: `https://via.placeholder.com/600x400?text=Photo+${i + 1}`,
}));

const ITEMS_PER_PAGE_DESKTOP = 10;
const ITEMS_PER_PAGE_MOBILE = 4;

export default function GalleryPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = isSmallScreen
    ? ITEMS_PER_PAGE_MOBILE
    : ITEMS_PER_PAGE_DESKTOP;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allGalleryItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allGalleryItems.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleImageClick = (item: any) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Gallery
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        A collection of our delightful catering moments. Click on any photo to
        see it larger!
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Grid
          container
          justifyContent="center"
          sx={{
            gap: {
              xs: theme.spacing(2),
              sm: theme.spacing(3),
              md: theme.spacing(3),
            },
          }}
        >
          {currentItems.map((item) => (
            <GalleryItem
              key={item.id}
              item={item}
              onImageClick={handleImageClick}
            />
          ))}
        </Grid>
      </Box>

      <GalleryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </Container>
  );
}
