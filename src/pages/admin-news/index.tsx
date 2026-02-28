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
  TablePagination,
  Card,
  CardMedia,
} from "@mui/material";
import {
  Add,
  Delete,
  Close,
  Block,
  Image as ImageIcon,
  AttachFile,
  CloudUpload,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNews, adminCreateNews, adminDeleteNews } from "~/api/news/api";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";

const AdminNewsPage = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuthContext();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [newsForm, setNewsForm] = useState<TYPES.NewsRequest>({
    title: "",
    description: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", page, rowsPerPage],
    queryFn: () => getNews(page, rowsPerPage),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      adminCreateNews(newsForm, [...imageFiles, ...documentFiles]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setDeleteConfirmId(null);
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewsForm({ title: "", description: "" });
    setImageFiles([]);
    setDocumentFiles([]);
  };

  const handleSubmit = () => {
    createMutation.mutate();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocumentFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocument = (index: number) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
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
          {t.adminNews?.loadError || "Error loading news"}:{" "}
          {(error as Error).message}
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
      <TableContainer
        component={Paper}
        sx={{ borderRadius: { xs: 1.5, sm: 2 }, overflow: "auto" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>
                {t.adminNews?.title || "Title"}
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                {t.adminNews?.description || "Description"}
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                {t.adminNews?.date || "Date"}
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                {t.admin?.actions || "Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news?.content && news?.content.length > 0 ? (
              news?.content.map((item) => (
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
      <TablePagination
        component="div"
        count={news?.totalElements || 0}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Create News Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: { xs: 2, sm: 3 }, m: { xs: 2, sm: 3 } },
        }}
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
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Title and Description */}
            <TextField
              label={t.adminNews?.title || "Title"}
              fullWidth
              value={newsForm.title}
              onChange={(e) =>
                setNewsForm({ ...newsForm, title: e.target.value })
              }
              required
            />
            <TextField
              label={t.adminNews?.description || "Description"}
              fullWidth
              multiline
              rows={4}
              value={newsForm.description}
              onChange={(e) =>
                setNewsForm({ ...newsForm, description: e.target.value })
              }
              required
            />

            {/* Image Upload Section */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <ImageIcon fontSize="small" />
                {t.adminNews?.images || "Images"}
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ textTransform: "none", borderRadius: 1.5, mb: 2 }}
                fullWidth
              >
                {t.adminNews?.uploadImages || "Upload Images"}
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {imageFiles.length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: 1,
                  }}
                >
                  {imageFiles.map((file, i) => (
                    <Card key={i} sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={URL.createObjectURL(file)}
                        alt={file.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeImage(i)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          p: 0.5,
                          fontSize: "0.65rem",
                          textAlign: "center",
                        }}
                      >
                        {formatFileSize(file.size)}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>

            {/* Document Upload Section */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <AttachFile fontSize="small" />
                {t.adminNews?.documents || "Documents"}
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ textTransform: "none", borderRadius: 1.5, mb: 2 }}
                fullWidth
              >
                {t.adminNews?.uploadDocuments || "Upload Documents"}
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleDocumentUpload}
                />
              </Button>
              {documentFiles.length > 0 && (
                <Stack spacing={0.5}>
                  {documentFiles.map((file, i) => (
                    <Chip
                      key={i}
                      icon={<AttachFile />}
                      label={`${file.name} (${formatFileSize(file.size)})`}
                      onDelete={() => removeDocument(i)}
                      sx={{ justifyContent: "space-between" }}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            pt: { xs: 1, sm: 2 },
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              textTransform: "none",
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !newsForm.title ||
              !newsForm.description ||
              createMutation.isPending
            }
            sx={{
              textTransform: "none",
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
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
        PaperProps={{
          sx: { borderRadius: { xs: 2, sm: 3 }, m: { xs: 2, sm: 3 } },
        }}
      >
        <DialogTitle>{t.adminNews?.deleteTitle || "Delete News"}</DialogTitle>
        <DialogContent>
          <Typography>
            {t.adminNews?.deleteMessage ||
              "Are you sure you want to delete this news item?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteConfirmId(null)}
            sx={{ textTransform: "none" }}
          >
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              deleteConfirmId && deleteMutation.mutate(deleteConfirmId)
            }
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
