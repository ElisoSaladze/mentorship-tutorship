import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "~/api/news/api";
import { useLanguage } from "~/providers/language-provider";
import { useResourceUrl } from "~/hooks/useResourceUrl";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NewsImage = ({ resourceId }: { resourceId?: string }) => {
  const { url, isLoading } = useResourceUrl(resourceId);

  if (!resourceId || (!url && !isLoading)) return null;

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          paddingTop: "50%",
          bgcolor: "grey.100",
          position: "relative",
        }}
      >
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    );
  }

  return (
    <CardMedia
      component="img"
      image={url || undefined}
      alt=""
      sx={{ height: { xs: 180, sm: 220 }, objectFit: "cover" }}
    />
  );
};

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <NewsImage resourceId={images[currentIndex]} />
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
            }}
          >
            <ArrowBackIosNewIcon />
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
            }}
          >
            <ArrowForwardIosIcon />
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
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        </>
      )}
    </Box>
  );
};

const PAGE_SIZE = 12;
const MAX_DESCRIPTION_LENGTH = 150;

const NewsPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);
  const [selectedNews, setSelectedNews] = useState<TYPES.NewsResponse | null>(null);

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", page],
    queryFn: () => getNews(page, PAGE_SIZE),
  });

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

  const handleOpenDialog = (item: TYPES.NewsResponse) => {
    setSelectedNews(item);
  };

  const handleCloseDialog = () => {
    setSelectedNews(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {t.news?.loadError || "Error loading news"}:{" "}
          {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 0, sm: 0 } }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
          mb: { xs: 3, sm: 4 },
        }}
      >
        {t.news?.pageTitle || "News"}
      </Typography>

      {news?.content && news.content.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {news.content.map((item) => {
            const images = item.file0 || [];
            const needsTruncation =
              item.description?.length > MAX_DESCRIPTION_LENGTH;

            return (
              <Card
                key={item.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: { xs: 1.5, sm: 2 },
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-4px)" },
                    boxShadow: { xs: 2, sm: 6 },
                  },
                }}
              >
                <ImageGallery images={images} />
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
                      onClick={() => handleOpenDialog(item)}
                      sx={{ alignSelf: "flex-start", mt: "auto" }}
                    >
                      Read More
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {t.news?.noNews || "No news yet"}
          </Typography>
        </Box>
      )}

      {news && news.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={news.totalPages}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* News Detail Dialog */}
      <Dialog
        open={!!selectedNews}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedNews && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {selectedNews.title}
              </Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedNews.file0 && selectedNews.file0.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <ImageGallery images={selectedNews.file0} />
                </Box>
              )}
              {selectedNews.addDate && (
                <Chip
                  label={formatDate(selectedNews.addDate)}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
              >
                {selectedNews.description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default NewsPage;
