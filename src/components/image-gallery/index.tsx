import { Box, IconButton } from "@mui/material";
import { memo, useState } from "react";
import NewsImage from "../news-image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = memo(({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 180, sm: 220 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <NewsImage resourceId={images[currentIndex]} />
      </Box>

      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              zIndex: 2,
            }}
            size="small"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              zIndex: 2,
            }}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.75rem",
              zIndex: 2,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        </>
      )}
    </Box>
  );
});

export default ImageGallery;
