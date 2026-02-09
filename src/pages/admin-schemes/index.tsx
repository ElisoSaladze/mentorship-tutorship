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
  Collapse,
  Chip,
} from "@mui/material";
import {
  Add,
  Edit,
  Close,
  ExpandMore,
  ExpandLess,
  School,
  Block,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminGetAllProgramSchemes,
  adminGetProgramScheme,
  createProgramScheme,
  updateProgramScheme,
} from "~/api/program-scheme/api";
import {
  createCourse,
  updateCourse,
} from "~/api/course/api";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";

const AdminSchemesPage = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuthContext();
  const queryClient = useQueryClient();

  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  const [openSchemeDialog, setOpenSchemeDialog] = useState(false);
  const [editingScheme, setEditingScheme] = useState<TYPES.ProgramSchemeResponse | null>(null);
  const [schemeForm, setSchemeForm] = useState<Partial<TYPES.ProgramSchemeRequest>>({
    title: "",
    description: "",
  });

  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TYPES.CourseResponse | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<TYPES.CourseRequest>>({
    name: "",
    maxSize: 0,
    registrationDates: { start: "", end: "" },
    programId: "",
  });

  // Fetch all schemes
  const {
    data: schemes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminSchemes"],
    queryFn: adminGetAllProgramSchemes,
  });

  // Fetch expanded scheme details (includes courses)
  const { data: expandedScheme } = useQuery({
    queryKey: ["adminScheme", expandedSchemeId],
    queryFn: () => adminGetProgramScheme(expandedSchemeId!),
    enabled: !!expandedSchemeId,
  });

  // Scheme mutations
  const createSchemeMutation = useMutation({
    mutationFn: createProgramScheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSchemes"] });
      handleCloseSchemeDialog();
    },
  });

  const updateSchemeMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TYPES.ProgramSchemeRequest }) =>
      updateProgramScheme(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSchemes"] });
      queryClient.invalidateQueries({ queryKey: ["adminScheme"] });
      handleCloseSchemeDialog();
    },
  });

  // Course mutations
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminScheme", expandedSchemeId] });
      handleCloseCourseDialog();
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TYPES.CourseRequest }) =>
      updateCourse(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminScheme", expandedSchemeId] });
      handleCloseCourseDialog();
    },
  });

  // Scheme dialog handlers
  const handleOpenSchemeDialog = (scheme?: TYPES.ProgramSchemeResponse) => {
    if (scheme) {
      setEditingScheme(scheme);
      setSchemeForm({ title: scheme.title, description: scheme.description });
    } else {
      setEditingScheme(null);
      setSchemeForm({ title: "", description: "" });
    }
    setOpenSchemeDialog(true);
  };

  const handleCloseSchemeDialog = () => {
    setOpenSchemeDialog(false);
    setEditingScheme(null);
    setSchemeForm({ title: "", description: "" });
  };

  const handleSubmitScheme = () => {
    const data = schemeForm as TYPES.ProgramSchemeRequest;
    if (editingScheme) {
      updateSchemeMutation.mutate({ id: editingScheme.id, body: data });
    } else {
      createSchemeMutation.mutate(data);
    }
  };

  // Course dialog handlers
  const handleOpenCourseDialog = (schemeId: string, course?: TYPES.CourseResponse) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        name: course.name,
        maxSize: course.maxSize,
        registrationDates: course.registrationDates || { start: "", end: "" },
        programId: course.programId,
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        name: "",
        maxSize: 0,
        registrationDates: { start: "", end: "" },
        programId: schemeId,
      });
    }
    setOpenCourseDialog(true);
  };

  const handleCloseCourseDialog = () => {
    setOpenCourseDialog(false);
    setEditingCourse(null);
    setCourseForm({ name: "", maxSize: 0, registrationDates: { start: "", end: "" }, programId: "" });
  };

  const handleSubmitCourse = () => {
    const data = courseForm as TYPES.CourseRequest;
    if (editingCourse) {
      updateCourseMutation.mutate({ id: editingCourse.id, body: data });
    } else {
      createCourseMutation.mutate(data);
    }
  };

  const toggleExpand = (schemeId: string) => {
    setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
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
          {t.adminSchemes?.loadError || "Error loading schemes"}: {(error as Error).message}
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
          {t.adminSchemes?.pageTitle || "Schemes & Courses"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenSchemeDialog()}
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
          {t.adminSchemes?.addScheme || "Add Scheme"}
        </Button>
      </Box>

      {/* Schemes Table */}
      <TableContainer component={Paper} sx={{ borderRadius: { xs: 1.5, sm: 2 }, overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600, width: 48 }} />
              <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.title || "Title"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.description || "Description"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.creator || "Creator"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.courses || "Courses"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                {t.admin?.actions || "Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schemes && schemes.length > 0 ? (
              schemes.map((scheme) => (
                <>
                  <TableRow
                    key={scheme.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleExpand(scheme.id)}>
                        {expandedSchemeId === scheme.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {scheme.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {scheme.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {scheme.creatorUserData
                          ? `${scheme.creatorUserData.name} ${scheme.creatorUserData.surname}`
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<School sx={{ fontSize: 16 }} />}
                        label={
                          expandedSchemeId === scheme.id && expandedScheme
                            ? expandedScheme.courses?.length || 0
                            : "..."
                        }
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title={t.common?.edit || "Edit"}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenSchemeDialog(scheme)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Courses Row */}
                  <TableRow key={`${scheme.id}-courses`}>
                    <TableCell colSpan={6} sx={{ py: 0, borderBottom: expandedSchemeId === scheme.id ? 1 : 0, borderColor: "divider" }}>
                      <Collapse in={expandedSchemeId === scheme.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                              {t.adminSchemes?.courses || "Courses"} — {scheme.title}
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={() => handleOpenCourseDialog(scheme.id)}
                              sx={{ textTransform: "none", borderRadius: 1.5 }}
                            >
                              {t.adminSchemes?.addCourse || "Add Course"}
                            </Button>
                          </Stack>

                          {expandedScheme?.courses && expandedScheme.courses.length > 0 ? (
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.courseName || "Course Name"}</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.maxSize || "Max Size"}</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.registrationStart || "Reg. Start"}</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }}>{t.adminSchemes?.registrationEnd || "Reg. End"}</TableCell>
                                  <TableCell sx={{ fontWeight: 600 }} align="right">{t.admin?.actions || "Actions"}</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {expandedScheme.courses.map((course) => (
                                  <TableRow key={course.id}>
                                    <TableCell>
                                      <Typography variant="body2" fontWeight={500}>
                                        {course.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{course.maxSize}</TableCell>
                                    <TableCell>{formatDate(course.registrationDates?.start)}</TableCell>
                                    <TableCell>{formatDate(course.registrationDates?.end)}</TableCell>
                                    <TableCell align="right">
                                      <Tooltip title={t.common?.edit || "Edit"}>
                                        <IconButton
                                          size="small"
                                          color="primary"
                                          onClick={() => handleOpenCourseDialog(scheme.id, course)}
                                        >
                                          <Edit fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <Typography color="text.secondary" variant="body2" sx={{ textAlign: "center", py: 2 }}>
                              {t.adminSchemes?.noCourses || "No courses in this scheme"}
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    {t.adminSchemes?.noSchemes || "No program schemes found"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Scheme Create/Edit Dialog */}
      <Dialog
        open={openSchemeDialog}
        onClose={handleCloseSchemeDialog}
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
            {editingScheme
              ? t.adminSchemes?.editScheme || "Edit Scheme"
              : t.adminSchemes?.addScheme || "Add Scheme"}
          </Typography>
          <IconButton onClick={handleCloseSchemeDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label={t.adminSchemes?.title || "Title"}
              fullWidth
              value={schemeForm.title || ""}
              onChange={(e) => setSchemeForm({ ...schemeForm, title: e.target.value })}
              required
            />
            <TextField
              label={t.adminSchemes?.description || "Description"}
              fullWidth
              multiline
              rows={4}
              value={schemeForm.description || ""}
              onChange={(e) => setSchemeForm({ ...schemeForm, description: e.target.value })}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1, sm: 2 }, flexDirection: { xs: "column-reverse", sm: "row" }, gap: 1 }}>
          <Button onClick={handleCloseSchemeDialog} sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}>
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitScheme}
            disabled={!schemeForm.title || createSchemeMutation.isPending || updateSchemeMutation.isPending}
            sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}
          >
            {createSchemeMutation.isPending || updateSchemeMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingScheme ? (
              t.common?.update || "Update"
            ) : (
              t.common?.create || "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Course Create/Edit Dialog */}
      <Dialog
        open={openCourseDialog}
        onClose={handleCloseCourseDialog}
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
            {editingCourse
              ? t.adminSchemes?.editCourse || "Edit Course"
              : t.adminSchemes?.addCourse || "Add Course"}
          </Typography>
          <IconButton onClick={handleCloseCourseDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label={t.adminSchemes?.courseName || "Course Name"}
              fullWidth
              value={courseForm.name || ""}
              onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
              required
            />
            <TextField
              label={t.adminSchemes?.maxSize || "Max Size"}
              fullWidth
              type="number"
              value={courseForm.maxSize || ""}
              onChange={(e) => setCourseForm({ ...courseForm, maxSize: parseInt(e.target.value) || 0 })}
              required
            />
            <TextField
              label={t.adminSchemes?.registrationStart || "Registration Start"}
              fullWidth
              type="datetime-local"
              value={courseForm.registrationDates?.start?.slice(0, 16) || ""}
              onChange={(e) =>
                setCourseForm({
                  ...courseForm,
                  registrationDates: {
                    ...courseForm.registrationDates!,
                    start: new Date(e.target.value).toISOString(),
                  },
                })
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label={t.adminSchemes?.registrationEnd || "Registration End"}
              fullWidth
              type="datetime-local"
              value={courseForm.registrationDates?.end?.slice(0, 16) || ""}
              onChange={(e) =>
                setCourseForm({
                  ...courseForm,
                  registrationDates: {
                    ...courseForm.registrationDates!,
                    end: new Date(e.target.value).toISOString(),
                  },
                })
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1, sm: 2 }, flexDirection: { xs: "column-reverse", sm: "row" }, gap: 1 }}>
          <Button onClick={handleCloseCourseDialog} sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}>
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitCourse}
            disabled={!courseForm.name || createCourseMutation.isPending || updateCourseMutation.isPending}
            sx={{ textTransform: "none", minHeight: 44, width: { xs: "100%", sm: "auto" } }}
          >
            {createCourseMutation.isPending || updateCourseMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingCourse ? (
              t.common?.update || "Update"
            ) : (
              t.common?.create || "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSchemesPage;
