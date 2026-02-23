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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "~/api/news/api";
import { useLanguage } from "~/providers/language-provider";
import { useResourceUrl } from "~/hooks/useResourceUrl";

const NewsImage = ({ resourceId }: { resourceId?: string }) => {
  const { url, isLoading } = useResourceUrl(resourceId);

  if (!resourceId || (!url && !isLoading)) return null;

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", paddingTop: "50%", bgcolor: "grey.100", position: "relative" }}>
        <CircularProgress size={24} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
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

const PAGE_SIZE = 12;

const NewsPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);

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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {t.news?.loadError || "Error loading news"}: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 0, sm: 0 } }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" }, mb: { xs: 3, sm: 4 } }}
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
              <NewsImage resourceId={item.file0?.[0]} />
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, flex: 1 }}
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
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
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
    </Box>
  );
};

export default NewsPage;
