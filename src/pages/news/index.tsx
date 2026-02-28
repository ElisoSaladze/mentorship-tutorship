import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "~/api/news/api";
import { useLanguage } from "~/providers/language-provider";
import NewsCard from "~/components/news-card";
import NewsDialog from "~/components/news-dialog";

const PAGE_SIZE = 12;

// Main NewsPage Component
const NewsPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);
  const [selectedNews, setSelectedNews] = useState<TYPES.NewsResponse | null>(
    null,
  );

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", page],
    queryFn: () => getNews(page, PAGE_SIZE),
  });

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
          {news.content.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onOpenDialog={handleOpenDialog}
            />
          ))}
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

      <NewsDialog newsId={selectedNews?.id || ""} onClose={handleCloseDialog} />
    </Box>
  );
};

export default NewsPage;
