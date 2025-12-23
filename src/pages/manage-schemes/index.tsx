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
import { Add, Edit, Close, Visibility } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProgramScheme,
  createProgramScheme,
  updateProgramScheme,
} from "~/api/program-scheme/api";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";
import ProgramSchemeDetails from "~/components/program-scheme";

const ManageSchemesPage = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  const { userDetails: user } = useAuthContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<TYPES.ProgramSchemeResponse | null>(null);
  const [editingScheme, setEditingScheme] =
    useState<TYPES.ProgramSchemeResponse | null>(null);
  const [formData, setFormData] = useState<Partial<TYPES.ProgramSchemeRequest>>({
    title: "",
    description: "",
    maxSize: 0,
    registrationDates: { start: "", end: "" },
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

  const handleOpenDialog = (scheme?: TYPES.ProgramSchemeResponse) => {
    if (scheme) {
      setEditingScheme(scheme);
      setFormData({
        title: scheme.title,
        description: scheme.description,
        maxSize: scheme.maxSize,
        registrationDates: scheme.registrationDates,
      });
    } else {
      setEditingScheme(null);
      setFormData({ title: "", description: "", maxSize: 0, registrationDates: { start: "", end: "" } });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingScheme(null);
    setFormData({ title: "", description: "", maxSize: 0, registrationDates: { start: "", end: "" } });
  };

  const handleOpenDetailsModal = (scheme: TYPES.ProgramSchemeResponse) => {
    setSelectedScheme(scheme);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedScheme(null);
  };

  const handleSubmit = () => {
    if (editingScheme) {
      updateMutation.mutate({
        id: editingScheme.id,
        body: formData as TYPES.ProgramSchemeRequest,
      });
    } else {
      createMutation.mutate(formData as TYPES.ProgramSchemeRequest);
    }
  };

  const handleInputChange = (
    field: keyof TYPES.ProgramSchemeRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isSeeker = user?.programRoles.includes("SEEKER");
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
          {t.manageSchemes.loadError} {(error as Error).message}
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
          {t.manageSchemes.pageTitle}
        </Typography>
        {canCreateOrEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            fullWidth={false}
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
            {t.manageSchemes.newScheme}
          </Button>
        )}
      </Box>

      {isSeeker && (
        <Alert severity="info" sx={{ mb: { xs: 2, sm: 3 }, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
          {t.manageSchemes.noPermission}
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
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {schemes.map((scheme) => (
            <Card
              key={scheme.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: { xs: 1.5, sm: 2 },
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-4px)" },
                  boxShadow: { xs: 2, sm: 6 },
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } }}
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
                    fontSize: { xs: "0.85rem", sm: "0.875rem" },
                  }}
                >
                  {scheme.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, flexWrap: "wrap", gap: 0.5 }}>
                <Button
                  size="small"
                  startIcon={<Visibility sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                  onClick={() => handleOpenDetailsModal(scheme)}
                  sx={{ textTransform: "none", minHeight: 36, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  View Details
                </Button>
                {canCreateOrEdit && (
                  <Button
                    size="small"
                    startIcon={<Edit sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                    onClick={() => handleOpenDialog(scheme)}
                    sx={{ textTransform: "none", minHeight: 36, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                  >
                    {t.common.edit}
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
            {t.manageSchemes.noSchemes}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {canCreateOrEdit
              ? t.manageSchemes.addFirstScheme
              : t.manageSchemes.schemesNotAdded}
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
              {t.manageSchemes.newScheme}
            </Button>
          )}
        </Box>
      )}

      {/* Program Scheme Details Modal */}
      <ProgramSchemeDetails
        scheme={selectedScheme}
        isOpen={openDetailsModal}
        onClose={handleCloseDetailsModal}
      />

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            m: { xs: 2, sm: 3 },
            maxHeight: { xs: "calc(100% - 32px)", sm: "calc(100% - 64px)" },
          },
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
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            {editingScheme
              ? t.manageSchemes.editScheme
              : t.manageSchemes.newScheme}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small" sx={{ width: 40, height: 40 }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
            <TextField
              label={t.manageSchemes.title}
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
              label={t.manageSchemes.description}
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
              label="Max Size"
              fullWidth
              type="number"
              value={formData.maxSize || 0}
              onChange={(e) => handleInputChange("maxSize", parseInt(e.target.value) || 0)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Start Date"
              fullWidth
              type="datetime-local"
              value={formData.registrationDates?.start || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationDates: {
                    ...prev.registrationDates,
                    start: e.target.value,
                    end: prev.registrationDates?.end || "",
                  },
                }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="End Date"
              fullWidth
              type="datetime-local"
              value={formData.registrationDates?.end || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationDates: {
                    ...prev.registrationDates,
                    start: prev.registrationDates?.start || "",
                    end: e.target.value,
                  },
                }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            pt: { xs: 1, sm: 2 },
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 1, sm: 1 },
          }}
        >
          <Button
            onClick={handleCloseDialog}
            fullWidth={false}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t.common.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !formData.title ||
              createMutation.isPending ||
              updateMutation.isPending
            }
            fullWidth={false}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {createMutation.isPending || updateMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingScheme ? (
              t.common.update
            ) : (
              t.common.create
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSchemesPage;