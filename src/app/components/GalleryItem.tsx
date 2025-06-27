import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";

interface GalleryItemProps {
  item: {
    id: number;
    name: string;
    imageSrc: string;
  };
  onImageClick: (item: any) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onImageClick }) => {
  const theme = useTheme();

  const gapXsValue = parseFloat(theme.spacing(2).replace("px", ""));
  const gapSmValue = parseFloat(theme.spacing(3).replace("px", ""));
  const gapMdValue = parseFloat(theme.spacing(3).replace("px", ""));

  return (
    <Grid
      item
      key={item.id}
      component="div"
      sx={{
        boxSizing: "border-box",
        width: {
          xs: `calc(50% - ${gapXsValue / 2}px)`,
          sm: `calc(50% - ${gapSmValue / 2}px)`,
          md: `calc(20% - ${(gapMdValue * 4) / 5}px)`,
          lg: `calc(20% - ${(gapMdValue * 4) / 5}px)`,
          xl: `calc(20% - ${(gapMdValue * 4) / 5}px)`,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 250,
          backgroundColor: "grey.300",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          borderRadius: 2,
          cursor: "pointer",
          overflow: "hidden",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={() => onImageClick(item)}
      >
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="body1">{item.name}</Typography>
        )}
      </Box>
    </Grid>
  );
};

export default GalleryItem;
