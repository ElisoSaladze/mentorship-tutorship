import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Chip,
  Alert,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Close as CloseIcon,
  CalendarMonth,
  Group,
  Person,
  School,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserToCourse } from "~/api/users/api";
import { getCoursesByProgramId } from "~/api/course/api";
import { useAuthContext } from "~/providers/auth";
import { useLanguage } from "~/providers/language-provider";
import { useState } from "react";

type Props = {
  scheme: TYPES.ProgramSchemeResponse | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProgramSchemeDetails = ({ scheme, isOpen, onClose }: Props) => {
  const { t } = useLanguage();
  const { userDetails } = useAuthContext();
  const queryClient = useQueryClient();
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joiningCourseId, setJoiningCourseId] = useState<string | null>(null);

  // Get user's program role
  const userRole = userDetails?.programRoles?.[0] || "SEEKER";

  // Fetch courses for this program
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses", scheme?.id],
    queryFn: () => getCoursesByProgramId(scheme?.id || ""),
    enabled: !!scheme?.id && isOpen,
  });

  const joinMutation = useMutation({
    mutationFn: (courseId: string) => addUserToCourse(courseId, userRole),
    onSuccess: (_, courseId) => {
      setJoinSuccess(courseId);
      setJoinError(null);
      setJoiningCourseId(null);
      queryClient.invalidateQueries({ queryKey: ["courses", scheme?.id] });
      setTimeout(() => {
        setJoinSuccess(null);
      }, 2000);
    },
    onError: (error: Error) => {
      setJoinError(error.message || "Failed to join course");
      setJoinSuccess(null);
      setJoiningCourseId(null);
    },
  });

  const handleJoinCourse = (courseId: string) => {
    setJoinError(null);
    setJoiningCourseId(courseId);
    joinMutation.mutate(courseId);
  };

  const handleClose = () => {
    setJoinError(null);
    setJoinSuccess(null);
    setJoiningCourseId(null);
    onClose();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (!scheme) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 2, sm: 3 },
          m: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: { xs: 2, sm: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          {t.programScheme?.detailsTitle || "Program Details"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "grey.500", width: 40, height: 40 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={{ xs: 2, sm: 3 }}>
          {/* Title Section */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="600"
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              {scheme.title}
            </Typography>
          </Box>

          {/* Description */}
          {scheme.description && (
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
              >
                {t.programScheme?.description || "Description"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, lineHeight: 1.7 }}
              >
                {scheme.description}
              </Typography>
            </Box>
          )}

          {/* Creator */}
          {scheme.creatorUserData && (
            <Box
              sx={{
                p: { xs: 1.5, sm: 2 },
                bgcolor: "grey.50",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                width: "fit-content",
              }}
            >
              <Person color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="body2" color="text.secondary">
                {t.programScheme?.creator || "Created By"}:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {scheme.creatorUserData.name} {scheme.creatorUserData.surname}
              </Typography>
            </Box>
          )}

          <Divider />

          {/* Courses Section */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <School color="primary" />
              <Typography variant="h6" fontWeight="600">
                {t.programScheme?.courses || "Available Courses"}
              </Typography>
            </Stack>

            {coursesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={32} />
              </Box>
            ) : courses && courses.length > 0 ? (
              <Stack spacing={2}>
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        {course.name}
                      </Typography>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 3 }}
                        sx={{ mt: 1 }}
                      >
                        {/* Max Size */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Group
                            color="action"
                            sx={{ fontSize: 18 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {t.programScheme?.maxSize || "Max Participants"}:
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {course.maxSize || "-"}
                          </Typography>
                        </Box>

                        {/* Registration Dates */}
                        {course.registrationDates && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarMonth
                              color="action"
                              sx={{ fontSize: 18 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(course.registrationDates.start)} - {formatDate(course.registrationDates.end)}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Chip
                        label={userRole}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                      <Box sx={{ flexGrow: 1 }} />
                      {joinSuccess === course.id ? (
                        <Chip
                          label={t.programScheme?.joinSuccess || "Joined!"}
                          color="success"
                          size="small"
                        />
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleJoinCourse(course.id)}
                          disabled={joiningCourseId === course.id}
                        >
                          {joiningCourseId === course.id ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            t.programScheme?.joinCourse || "Join Course"
                          )}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                {t.programScheme?.noCourses || "No courses available for this program"}
              </Typography>
            )}
          </Box>

          {/* Error Message */}
          {joinError && (
            <Alert severity="error" sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem" } }}>
              {joinError}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 },
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          sx={{ minHeight: 44 }}
        >
          {t.common?.cancel || "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramSchemeDetails;
