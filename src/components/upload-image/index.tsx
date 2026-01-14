import { useState, useRef, useEffect } from "react";
import { Box, Avatar, IconButton, Typography, Alert } from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";
import { useResourceUrl } from "~/hooks/useResourceUrl";

interface UploadImageProps {
  value?: File | null;
  existingImageId?: string | null;
  onChange?: (file: File | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const UploadImage = ({
  value,
  existingImageId,
  onChange,
  error,
  helperText,
  disabled = false,
}: UploadImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { url: existingImageUrl } = useResourceUrl(existingImageId);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  useEffect(() => {
    // If a new file is selected, show its preview
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    // Otherwise show existing image if available
    setPreview(existingImageUrl || null);
    return undefined;
  }, [value, existingImageUrl]);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload an image (JPG, PNG or WebP)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must not exceed 5MB";
    }
    return null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || disabled) return;

    setValidationError(null);
    const validationErr = validateFile(file);
    if (validationErr) {
      setValidationError(validationErr);
      return;
    }
    onChange?.(file);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setValidationError(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const displayError = validationError || helperText;
  const hasError = error || !!validationError;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        Profile Image
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          onClick={handleClick}
          sx={{
            position: "relative",
            cursor: disabled ? "default" : "pointer",
            "&:hover .upload-overlay": {
              opacity: disabled ? 0 : 1,
            },
          }}
        >
          <Avatar
            src={preview || undefined}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "grey.200",
              border: hasError ? "2px solid" : "2px solid",
              borderColor: hasError ? "error.main" : "divider",
              opacity: disabled ? 0.6 : 1,
            }}
          />

          {!disabled && (
            <Box
              className="upload-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
            >
              <CameraAlt sx={{ color: "white", fontSize: 24 }} />
            </Box>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            disabled={disabled}
            style={{ display: "none" }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.primary">
            {preview ? "Change photo" : "Upload photo"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            JPG, PNG or WebP. Max 5MB
          </Typography>
        </Box>

        {preview && !disabled && (
          <IconButton
            onClick={handleDelete}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "error.main",
              },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>

      {displayError && (
        <Alert
          severity="error"
          onClose={validationError ? () => setValidationError(null) : undefined}
          sx={{ py: 0.5 }}
        >
          {displayError}
        </Alert>
      )}
    </Box>
  );
};

export default UploadImage;
