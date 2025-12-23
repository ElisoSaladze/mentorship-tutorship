
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
} from "@mui/material";
import {
  Close as CloseIcon,
  CalendarMonth,
  Group,
  Person,
} from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUsersToProgramScheme } from "~/api/users/api";
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
  const [joinSuccess, setJoinSuccess] = useState(false);

  // Get user's program role
  const userRole = userDetails?.programRoles?.[0] || "SEEKER";

  const joinMutation = useMutation({
    mutationFn: () => addUsersToProgramScheme(scheme?.id || "", userRole),
    onSuccess: () => {
      setJoinSuccess(true);
      setJoinError(null);
      queryClient.invalidateQueries({ queryKey: ["programSchemes"] });
      setTimeout(() => {
        setJoinSuccess(false);
        onClose();
      }, 1500);
    },
    onError: (error: Error) => {
      setJoinError(error.message || "Failed to join program");
      setJoinSuccess(false);
    },
  });

  const handleJoin = () => {
    if (!scheme?.id) return;
    setJoinError(null);
    joinMutation.mutate();
  };

  const handleClose = () => {
    setJoinError(null);
    setJoinSuccess(false);
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
      maxWidth="sm"
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

          <Divider />

          {/* Info Cards */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 2 }}
          >
            {/* Max Size */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 1.5, sm: 2 },
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                <Group color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {t.programScheme?.maxSize || "Max Participants"}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                fontWeight="500"
                sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
              >
                {scheme.maxSize || "-"}
              </Typography>
            </Box>

            {/* Creator */}
            {scheme.creatorUserData && (
              <Box
                sx={{
                  flex: 1,
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: "grey.50",
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                  <Person color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {t.programScheme?.creator || "Created By"}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
                >
                  {scheme.creatorUserData.name} {scheme.creatorUserData.surname}
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Registration Dates */}
          {scheme.registrationDates && (
            <Box
              sx={{
                p: { xs: 1.5, sm: 2 },
                bgcolor: "primary.50",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.100",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <CalendarMonth color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {t.programScheme?.registrationPeriod || "Registration Period"}
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 0.5, sm: 2 }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    {t.programScheme?.startDate || "Start"}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem" } }}
                  >
                    {formatDate(scheme.registrationDates.start)}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    alignSelf: "center",
                  }}
                >
                  -
                </Typography>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    {t.programScheme?.endDate || "End"}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem" } }}
                  >
                    {formatDate(scheme.registrationDates.end)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}

          {/* User Role Chip */}
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
            >
              {t.programScheme?.joiningAs || "You will join as"}
            </Typography>
            <Chip
              label={userRole}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>

          {/* Error/Success Messages */}
          {joinError && (
            <Alert severity="error" sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem" } }}>
              {joinError}
            </Alert>
          )}

          {joinSuccess && (
            <Alert severity="success" sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem" } }}>
              {t.programScheme?.joinSuccess || "Successfully joined the program!"}
            </Alert>
          )}
        </Stack>
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
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          fullWidth={false}
          sx={{
            minHeight: 44,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {t.common?.cancel || "Cancel"}
        </Button>
        <Button
          onClick={handleJoin}
          variant="contained"
          color="primary"
          disabled={joinMutation.isPending || joinSuccess}
          fullWidth={false}
          sx={{
            minHeight: 44,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {joinMutation.isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t.programScheme?.joinProgram || "Join Program"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramSchemeDetails;
