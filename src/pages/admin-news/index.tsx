import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Add,
  Delete,
  Close,
  Block,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNews, adminCreateNews, adminDeleteNews } from "~/api/news/api";
import { keys } from "~/api/keys";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";

const AdminNewsPage = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuthContext();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [newsForm, setNewsForm] = useState<TYPES.NewsRequest>({
    title: "",
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: keys.news.all(),
    queryFn: getNews,
  });

  const createMutation = useMutation({
    mutationFn: () => adminCreateNews(newsForm, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.news.all() });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.news.all() });
      setDeleteConfirmId(null);
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewsForm({ title: "", description: "" });
    setFiles([]);
  };

  const handleSubmit = () => {
    createMutation.mutate();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (!isAdmin) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
        }}
      >
        <Block sx={{ fontSize: 64, color: "error.main" }} />
        <Typography variant="h5" fontWeight={600} color="error.main">
          {t.admin?.unauthorized || "Access Denied"}
        </Typography>
      </Box>
    );
  }

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
          {t.adminNews?.loadError || "Error loading news"}: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 0, sm: 0 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: { xs: 3, sm: 4 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}
        >
          {t.adminNews?.pageTitle || "News Management"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.2 },
            minHeight: 44,
            fontWeight: 600,
            textTransform: "none",
            alignSelf: { xs: "flex-start", sm: "center" },
          }}
        >
          {t.adminNews?.addNews || "Add News"}
        </Button>
      </Box>

      {/* News Table */}
      <TableContainer component={Paper} sx={{ borderRadius: { xs: 1.5, sm: 2 }, overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminNews?.title || "Title"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminNews?.description || "Description"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminNews?.date || "Date"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                {t.admin?.actions || "Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news && news.length > 0 ? (
              news.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {item.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={formatDate(item.addDate)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={t.common?.delete || "Delete"}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteConfirmId(item.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    {t.adminNews?.noNews || "No news found"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create News Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 2, sm: 3 }, m: { xs: 2, sm: 3 } } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 3 },
            pt: { xs: 2, sm: 3 },
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {t.adminNews?.addNews || "Add News"}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label={t.adminNews?.title || "Title"}
              fullWidth
              value={newsForm.title}
              onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
              required
            />
            <TextField
              label={t.adminNews?.description || "Description"}
              fullWidth
              multiline
              rows={4}
              value={newsForm.description}
              onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
              required
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none", borderRadius: 1.5 }}
            >
              {t.adminNews?.uploadFiles || "Upload Files"}
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
            </Button>
            {files.length > 0 && (
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {files.map((file, i) => (
                  <Chip
                    key={i}
                    label={file.name}
                    size="small"
                    onDelete={() => setFiles(files.filter((_, idx) => idx !== i))}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1, sm: 2 }, flexDirection: { xs: "column-reverse", sm: "row" }, gap: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}>
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!newsForm.title || !newsForm.description || createMutation.isPending}
            sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}
          >
            {createMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t.common?.create || "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 2, sm: 3 }, m: { xs: 2, sm: 3 } } }}
      >
        <DialogTitle>
          {t.adminNews?.deleteTitle || "Delete News"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t.adminNews?.deleteMessage || "Are you sure you want to delete this news item?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteConfirmId(null)} sx={{ textTransform: "none" }}>
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteConfirmId && deleteMutation.mutate(deleteConfirmId)}
            disabled={deleteMutation.isPending}
            sx={{ textTransform: "none" }}
          >
            {deleteMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t.common?.delete || "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminNewsPage;
