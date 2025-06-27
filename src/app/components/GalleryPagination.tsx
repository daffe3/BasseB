import React from "react";
import { Button, Stack, Typography } from "@mui/material";

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const GalleryPagination: React.FC<GalleryPaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
      <Button
        variant="contained"
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography variant="body1" sx={{ alignSelf: "center" }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
};

export default GalleryPagination;
