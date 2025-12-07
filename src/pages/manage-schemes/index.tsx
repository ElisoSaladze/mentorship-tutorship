import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Add, Edit, Close } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProgramScheme,
  createProgramScheme,
  updateProgramScheme,
} from "~/api/program-scheme/api";

const ManageSchemesPage = () => {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingScheme, setEditingScheme] =
    useState<TYPES.programScheme | null>(null);
  const [formData, setFormData] = useState<Partial<TYPES.programScheme>>({
    title: "",
    description: "",
    userProgramRoleToUserMap: "",
  });

  // Fetch all schemes
  const {
    data: schemes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["programSchemes"],
    queryFn: getProgramScheme,
  });

  // Create scheme mutation
  const createMutation = useMutation({
    mutationFn: createProgramScheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programSchemes"] });
      handleCloseDialog();
    },
  });

  // Update scheme mutation
  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateProgramScheme(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programSchemes"] });
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (scheme?: TYPES.programScheme) => {
    if (scheme) {
      setEditingScheme(scheme);
      setFormData(scheme);
    } else {
      setEditingScheme(null);
      setFormData({ title: "", description: "", userProgramRoleToUserMap: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingScheme(null);
    setFormData({ title: "", description: "", userProgramRoleToUserMap: "" });
  };

  const handleSubmit = () => {
    if (editingScheme) {
      updateMutation.mutate({
        id: editingScheme.id!,
        body: formData,
      });
    } else {
      createMutation.mutate(formData as TYPES.programScheme);
    }
  };

  const handleInputChange = (
    field: keyof TYPES.programScheme,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isSeeker = "seeker";
  const canCreateOrEdit = !isSeeker;

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
          შეცდომა სქემების ჩატვირთვისას: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          პროგრამის სქემები
        </Typography>
        {canCreateOrEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            ახალი სქემა
          </Button>
        )}
      </Box>

      {isSeeker && (
        <Alert severity="info" sx={{ mb: 3 }}>
          თქვენ არ გაქვთ უფლება სქემების შექმნის ან რედაქტირების.
        </Alert>
      )}

      {/* Schemes Display */}
      {schemes && schemes.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {schemes.map((scheme) => (
            <Card
              key={scheme.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {scheme.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {scheme.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                {canCreateOrEdit && (
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleOpenDialog(scheme)}
                    sx={{ textTransform: "none" }}
                  >
                    რედაქტირება
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            სქემები არ არის
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {canCreateOrEdit
              ? "დაამატეთ თქვენი პირველი პროგრამის სქემა"
              : "სქემები ჯერ არ არის დამატებული"}
          </Typography>
          {canCreateOrEdit && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              ახალი სქემა
            </Button>
          )}
        </Box>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {editingScheme ? "სქემის რედაქტირება" : "ახალი სქემა"}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="სათაური"
              fullWidth
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="აღწერა"
              fullWidth
              multiline
              rows={4}
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="როლის რუკა"
              fullWidth
              value={formData.userProgramRoleToUserMap || ""}
              onChange={(e) =>
                handleInputChange("userProgramRoleToUserMap", e.target.value)
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            გაუქმება
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !formData.title ||
              createMutation.isPending ||
              updateMutation.isPending
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            {createMutation.isPending || updateMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingScheme ? (
              "განახლება"
            ) : (
              "შექმნა"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSchemesPage;
