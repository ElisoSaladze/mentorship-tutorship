import { useState, useRef, useEffect } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

interface UploadImageProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const UploadImage = ({
  value,
  onChange,
  error,
  helperText,
  disabled = false,
}: UploadImageProps) => {
  const [localImage, setLocalImage] = useState<string | null>(value || null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  // Sync with external value changes
  useEffect(() => {
    setLocalImage(value || null);
  }, [value]);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "გთხოვთ ატვირთოთ სურათი (JPG, PNG ან WebP ფორმატში)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "სურათის ზომა არ უნდა აღემატებოდეს 5MB-ს";
    }
    return null;
  };

  const handleFileChange = (file: File) => {
    if (disabled) return;

    setValidationError(null);

    const validationErr = validateFile(file);
    if (validationErr) {
      setValidationError(validationErr);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLocalImage(result);
      onChange?.(result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDelete = () => {
    if (disabled) return;

    setLocalImage(null);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        პროფილის სურათი
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Avatar Preview */}
        <Avatar
          src={localImage || undefined}
          sx={{
            width: 100,
            height: 100,
            bgcolor: "primary.light",
            fontSize: "2rem",
            border: hasError ? "2px solid" : "none",
            borderColor: "error.main",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {!localImage && <PhotoCamera sx={{ fontSize: "2.5rem" }} />}
        </Avatar>

        {/* Upload Area */}
        <Paper
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            cursor: disabled ? "not-allowed" : "pointer",
            border: "2px dashed",
            borderColor: hasError
              ? "error.main"
              : isDragging
              ? "primary.main"
              : "divider",
            bgcolor: isDragging ? "action.hover" : "background.paper",
            transition: "all 0.2s",
            opacity: disabled ? 0.6 : 1,
            "&:hover": {
              borderColor: disabled
                ? "divider"
                : hasError
                ? "error.main"
                : "primary.main",
              bgcolor: disabled ? "background.paper" : "action.hover",
            },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            disabled={disabled}
            style={{ display: "none" }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              {localImage ? "ახალი სურათის ატვირთვა" : "ატვირთეთ სურათი"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              გადმოიტანეთ სურათი აქ ან დააჭირეთ ასარჩევად
            </Typography>
            <Typography variant="caption" color="text.secondary">
              JPG, PNG ან WebP • მაქს. 5MB
            </Typography>
          </Box>
        </Paper>

        {/* Delete Button */}
        {localImage && !disabled && (
          <IconButton
            onClick={handleDelete}
            color="error"
            sx={{
              alignSelf: "flex-start",
            }}
          >
            <Delete />
          </IconButton>
        )}
      </Box>

      {/* Error or Helper Message */}
      {displayError && (
        <Alert
          severity={hasError ? "error" : "info"}
          onClose={validationError ? () => setValidationError(null) : undefined}
        >
          {displayError}
        </Alert>
      )}
    </Box>
  );
};

export default UploadImage;
