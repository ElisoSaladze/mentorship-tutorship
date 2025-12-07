import { useState, useRef } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

const UploadImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
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
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        პროფილის სურათი
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Avatar Preview */}
        <Avatar
          src={image || undefined}
          sx={{
            width: 100,
            height: 100,
            bgcolor: "primary.light",
            fontSize: "2rem",
          }}
        >
          {!image && <PhotoCamera sx={{ fontSize: "2.5rem" }} />}
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
            cursor: "pointer",
            border: "2px dashed",
            borderColor: isDragging ? "primary.main" : "divider",
            bgcolor: isDragging ? "action.hover" : "background.paper",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "action.hover",
            },
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              {image ? "ახალი სურათის ატვირთვა" : "ატვირთეთ სურათი"}
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
        {image && (
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

      {/* Error Message */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default UploadImage;
