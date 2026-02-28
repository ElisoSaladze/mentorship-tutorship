// NewsDialog.tsx - Fixed
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { memo, useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "../image-gallery";
import { getNewsById } from "~/api/news/api";
import { useResourceUrl } from "~/hooks/useResourceUrl";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";

interface NewsDialogProps {
  newsId: string | null;
  onClose: () => void;
}

const getAllFiles = (item: TYPES.NewsResponse): string[] => {
  return Object.entries(item)
    .filter(([key, value]) => key.startsWith("file") && Array.isArray(value))
    .flatMap(([, value]) => value as string[]);
};

// Component to detect and display file info
const FileItem = memo(
  ({
    fileId,
    onTypeDetect,
  }: {
    fileId: string;
    onTypeDetect: (id: string, isImage: boolean, contentType: string) => void;
  }) => {
    const { contentType } = useResourceUrl(fileId);

    useMemo(() => {
      if (contentType) {
        onTypeDetect(fileId, contentType.startsWith("image/"), contentType);
      }
    }, [contentType, fileId, onTypeDetect]);

    return null;
  },
);

FileItem.displayName = "FileItem";

// Component for downloadable file item
const DownloadableFileItem = memo(
  ({
    fileId,
    index,
    contentType,
  }: {
    fileId: string;
    index: number;
    contentType: string;
  }) => {
    const { url } = useResourceUrl(fileId);

    const handleDownload = () => {
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `attachment_${fileId}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    const getFileIcon = (ct: string) => {
      if (ct.includes("pdf")) return <PictureAsPdfIcon />;
      if (ct.includes("word") || ct.includes("document"))
        return <DescriptionIcon />;
      if (ct.startsWith("image/")) return <ImageIcon />;
      return <AttachFileIcon />;
    };

    const getFileTypeName = (ct: string): string => {
      const types: Record<string, string> = {
        "application/pdf": "PDF Document",
        "application/msword": "Word Document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          "Word Document",
        "application/vnd.ms-excel": "Excel Spreadsheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          "Excel Spreadsheet",
        "text/plain": "Text File",
      };

      return types[ct] || ct.split("/")[1]?.toUpperCase() || "File";
    };

    return (
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="download"
            onClick={handleDownload}
            disabled={!url}
          >
            <DownloadIcon />
          </IconButton>
        }
        sx={{
          borderRadius: 1,
          mb: 0.5,
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <ListItemIcon>{getFileIcon(contentType)}</ListItemIcon>
        <ListItemText
          primary={`Attachment ${index + 1}`}
          secondary={contentType ? getFileTypeName(contentType) : "Loading..."}
        />
      </ListItem>
    );
  },
);

DownloadableFileItem.displayName = "DownloadableFileItem";

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

const NewsDialog = memo(({ newsId, onClose }: NewsDialogProps) => {
  const [fileMetadata, setFileMetadata] = useState<
    Record<string, { isImage: boolean; contentType: string }>
  >({});

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getNewsById(newsId!),
    enabled: !!newsId,
  });

  const allFiles = useMemo(() => (news ? getAllFiles(news) : []), [news]);

  const handleTypeDetect = useCallback(
    (id: string, isImage: boolean, contentType: string) => {
      setFileMetadata((prev) => ({
        ...prev,
        [id]: { isImage, contentType },
      }));
    },
    [],
  );

  const { imageFiles, documentFiles } = useMemo(() => {
    const images: string[] = [];
    const docs: string[] = [];

    allFiles.forEach((fileId) => {
      const metadata = fileMetadata[fileId];
      if (metadata?.isImage) {
        images.push(fileId);
      } else if (metadata && !metadata.isImage) {
        docs.push(fileId);
      }
    });

    return { imageFiles: images, documentFiles: docs };
  }, [allFiles, fileMetadata]);

  if (!newsId) return null;

  return (
    <>
      {/* Hidden components to detect file types */}
      {allFiles.map((fileId) => (
        <FileItem
          key={fileId}
          fileId={fileId}
          onTypeDetect={handleTypeDetect}
        />
      ))}

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
              {imageFiles.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <ImageGallery images={imageFiles} />
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
                sx={{ whiteSpace: "pre-line", lineHeight: 1.7, mb: 3 }}
              >
                {news.description}
              </Typography>

              {documentFiles.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Attachments ({documentFiles.length})
                  </Typography>
                  <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
                    {documentFiles.map((fileId, index) => {
                      const metadata = fileMetadata[fileId];
                      return (
                        <DownloadableFileItem
                          key={fileId}
                          fileId={fileId}
                          index={index}
                          contentType={metadata?.contentType || ""}
                        />
                      );
                    })}
                  </List>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

NewsDialog.displayName = "NewsDialog";

export default NewsDialog;
