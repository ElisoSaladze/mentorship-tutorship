import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import { Close, Image as ImageIcon } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProgramScheme,
  updateProgramScheme,
} from "~/api/program-scheme/api";

interface Props {
  open: boolean;
  onClose: () => void;
  editingScheme: TYPES.ProgramSchemeResponse | null;
}

const SchemeDialog = ({ open, onClose, editingScheme }: Props) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<TYPES.ProgramSchemeRequest>({
    title: "",
    description: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (editingScheme) {
      setForm({
        title: editingScheme.title,
        description: editingScheme.description,
      });
    } else {
      setForm({ title: "", description: "" });
      setFiles([]);
    }
  }, [editingScheme]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: ({
      body,
      files,
    }: {
      body: TYPES.ProgramSchemeRequest;
      files: File[];
    }) => createProgramScheme(body, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSchemes"] });
      handleClose();
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
      files,
    }: {
      id: string;
      body: TYPES.ProgramSchemeRequest;
      files: File[];
    }) => updateProgramScheme(id, body, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSchemes"] });
      handleClose();
    },
  });

  const handleClose = () => {
    setForm({ title: "", description: "" });
    setFiles([]);
    onClose();
  };

  const handleSubmit = () => {
    if (editingScheme) {
      updateMutation.mutate({
        id: editingScheme.id,
        body: form,
        files,
      });
    } else {
      createMutation.mutate({
        body: form,
        files,
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {editingScheme ? "Edit Scheme" : "Add Scheme"}
        </Typography>

        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box mt={1} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Upload Image Button */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </Button>

          {/* File Chips */}
          {files.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {files.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  size="small"
                  onDelete={() => setFiles(files.filter((_, i) => i !== index))}
                />
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 1,
        }}
      >
        <Button onClick={handleClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!form.title || isPending}
          sx={{ textTransform: "none" }}
        >
          {isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : editingScheme ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchemeDialog;
