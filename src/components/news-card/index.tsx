import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import ImageGallery from "../image-gallery";

interface NewsCardProps {
  item: TYPES.NewsResponse;
  onOpenDialog: (item: TYPES.NewsResponse) => void;
}

const MAX_DESCRIPTION_LENGTH = 150;

// Utility functions
const getAllImages = (item: TYPES.NewsResponse): string[] => {
  return Object.entries(item)
    .filter(([key, value]) => key.startsWith("file") && Array.isArray(value))
    .flatMap(([, value]) => value as string[]);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const NewsCard = memo(({ item, onOpenDialog }: NewsCardProps) => {
  const images = getAllImages(item);
  const needsTruncation = item.description?.length > MAX_DESCRIPTION_LENGTH;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 1.5, sm: 2 },
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: needsTruncation ? "pointer" : "default",
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-4px)" },
          boxShadow: { xs: 2, sm: 6 },
        },
      }}
      onClick={() => needsTruncation && onOpenDialog(item)}
    >
      {images.length > 0 && <ImageGallery images={images} />}
      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2.5, md: 3 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              flex: 1,
            }}
          >
            {item.title}
          </Typography>
          {item.addDate && (
            <Chip
              label={formatDate(item.addDate)}
              size="small"
              variant="outlined"
              sx={{ ml: 1, flexShrink: 0 }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.85rem", sm: "0.875rem" },
            whiteSpace: "pre-line",
            mb: needsTruncation ? 2 : 0,
            flexGrow: 1,
          }}
        >
          {needsTruncation
            ? truncateText(item.description, MAX_DESCRIPTION_LENGTH)
            : item.description}
        </Typography>
        {needsTruncation && (
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDialog(item);
            }}
            sx={{ alignSelf: "flex-start", mt: "auto" }}
          >
            Read More
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

export default NewsCard;
