// NewsCard.tsx - Simplified
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import ImageGallery from "../image-gallery";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useResourceUrl } from "~/hooks/useResourceUrl";

interface NewsCardProps {
  item: TYPES.NewsResponse;
  onOpenDialog: (id: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 150;

// Utility to get all file IDs
const getAllFiles = (item: TYPES.NewsResponse): string[] => {
  return Object.entries(item)
    .filter(([key, value]) => key.startsWith("file") && Array.isArray(value))
    .flatMap(([, value]) => value as string[]);
};

// Component to determine file type
const FileTypeDetector = ({
  fileId,
  onDetect,
}: {
  fileId: string;
  onDetect: (id: string, isImage: boolean) => void;
}) => {
  const { contentType } = useResourceUrl(fileId);

  useMemo(() => {
    if (contentType) {
      onDetect(fileId, contentType.startsWith("image/"));
    }
  }, [contentType, fileId, onDetect]);

  return null;
};

// const getFileIcon = (contentType: string) => {
//   if (contentType.includes("pdf")) {
//     return <PictureAsPdfIcon fontSize="small" />;
//   }
//   if (contentType.includes("word") || contentType.includes("document")) {
//     return <DescriptionIcon fontSize="small" />;
//   }
//   return <AttachFileIcon fontSize="small" />;
// };

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
  const allFiles = getAllFiles(item);
  const [fileTypes, setFileTypes] = useState<Record<string, boolean>>({});

  const handleFileDetect = useCallback((id: string, isImage: boolean) => {
    setFileTypes((prev) => ({ ...prev, [id]: isImage }));
  }, []);

  const { imageFiles, documentFiles } = useMemo(() => {
    const images: string[] = [];
    const docs: string[] = [];

    allFiles.forEach((fileId) => {
      if (fileTypes[fileId] === true) {
        images.push(fileId);
      } else if (fileTypes[fileId] === false) {
        docs.push(fileId);
      }
    });

    return { imageFiles: images, documentFiles: docs };
  }, [allFiles, fileTypes]);

  const needsTruncation = item.description?.length > MAX_DESCRIPTION_LENGTH;

  return (
    <>
      {/* Hidden components to detect file types */}
      {allFiles.map((fileId) => (
        <FileTypeDetector
          key={fileId}
          fileId={fileId}
          onDetect={handleFileDetect}
        />
      ))}

      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: { xs: 1.5, sm: 2 },
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-4px)" },
            boxShadow: { xs: 2, sm: 6 },
          },
        }}
        onClick={() => onOpenDialog(item.id)}
      >
        {imageFiles.length > 0 && <ImageGallery images={imageFiles} />}

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
              mb: documentFiles.length > 0 ? 2 : 0,
              flexGrow: 1,
            }}
          >
            {needsTruncation
              ? truncateText(item.description, MAX_DESCRIPTION_LENGTH)
              : item.description}
          </Typography>

          {/* Document attachments preview */}
          {documentFiles.length > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}
            >
              {documentFiles.slice(0, 2).map((fileId, index) => (
                <Chip
                  key={fileId}
                  icon={<AttachFileIcon />}
                  label={`Attachment ${index + 1}`}
                  size="small"
                  variant="outlined"
                />
              ))}
              {documentFiles.length > 2 && (
                <Chip
                  icon={<AttachFileIcon />}
                  label={`+${documentFiles.length - 2} more`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          )}

          {needsTruncation && (
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDialog(item.id);
              }}
              sx={{ alignSelf: "flex-start", mt: 2 }}
            >
              Read More
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
});

NewsCard.displayName = "NewsCard";

export default NewsCard;
