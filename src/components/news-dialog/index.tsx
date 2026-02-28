import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Box,
  Chip,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "../image-gallery";
import { getNewsById } from "~/api/news/api";

interface NewsDialogProps {
  newsId: string | null;
  onClose: () => void;
}

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

const NewsDialog = memo(({ newsId, onClose }: NewsDialogProps) => {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getNewsById(newsId!),
    enabled: !!newsId, // Only fetch when newsId is provided
  });

  if (!newsId) return null;

  return (
    <Dialog open={!!newsId} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          {news?.title || "Loading..."}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading news details
          </Alert>
        )}

        {news && !isLoading && (
          <>
            {getAllImages(news).length > 0 && (
              <Box sx={{ mb: 3 }}>
                <ImageGallery images={getAllImages(news)} />
              </Box>
            )}
            {news.addDate && (
              <Chip
                label={formatDate(news.addDate)}
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
            >
              {news.description}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

NewsDialog.displayName = "NewsDialog";

export default NewsDialog;
