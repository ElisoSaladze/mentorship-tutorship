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
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tooltip,
  Rating,
  InputAdornment,
} from "@mui/material";
import {
  CheckCircle,
  Delete,
  Edit,
  PersonAdd,
  Close,
  HourglassEmpty,
  Block,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminGetAllUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  adminConfirmUser,
} from "~/api/users/api";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";

const AdminUsersPage = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuthContext();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<TYPES.UserFullResponse | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Partial<TYPES.UserRequest>>({
    email: "",
    username: "",
    password: "",
    name: "",
    surname: "",
    roles: ["STUDENT"],
    programRoles: ["SEEKER"],
    confirmed: false,
    rating: 0,
  });

  // Fetch all users
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: adminGetAllUsers,
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: adminCreateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      handleCloseDialog();
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TYPES.UserRequest }) =>
      adminUpdateUser(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      handleCloseDialog();
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: adminDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      setDeleteConfirmId(null);
    },
  });

  // Confirm user mutation
  const confirmMutation = useMutation({
    mutationFn: adminConfirmUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });

  const handleOpenDialog = (user?: TYPES.UserFullResponse) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        username: user.username,
        password: "",
        name: user.name,
        surname: user.surname,
        roles: user.roles,
        programRoles: user.programRoles,
        year: user.year,
        strengths: user.strengths,
        motivation: user.motivation,
        keywords: user.keywords,
        workingPlace: user.workingPlace,
        workingPosition: user.workingPosition,
        experience: user.experience,
        confirmed: user.confirmed,
        rating: user.rating || 0,
      });
    } else {
      setEditingUser(null);
      setFormData({
        email: "",
        username: "",
        password: "",
        name: "",
        surname: "",
        roles: ["STUDENT"],
        programRoles: ["SEEKER"],
        confirmed: false,
        rating: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setShowPassword(false);
    setFormData({
      email: "",
      username: "",
      password: "",
      name: "",
      surname: "",
      roles: ["STUDENT"],
      programRoles: ["SEEKER"],
      confirmed: false,
      rating: 0,
    });
  };

  const handleSubmit = () => {
    const submitData = formData as TYPES.UserRequest;
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, body: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleConfirmUser = (userId: string) => {
    confirmMutation.mutate(userId);
  };

  const handleDeleteUser = (userId: string) => {
    deleteMutation.mutate(userId);
  };

  const getRoleColor = (role: TYPES.ProgramRole) => {
    switch (role) {
      case "MENTOR":
        return "primary";
      case "TUTOR":
        return "secondary";
      case "SEEKER":
        return "default";
      default:
        return "default";
    }
  };

  // Show unauthorized message for non-admin users
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
        <Typography color="text.secondary" textAlign="center">
          {t.admin?.unauthorizedMessage || "You do not have permission to access this page."}
        </Typography>
      </Box>
    );
  }

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
          {t.admin?.loadError || "Error loading users"}: {(error as Error).message}
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
          {t.admin?.pageTitle || "User Management"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => handleOpenDialog()}
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
          {t.admin?.addUser || "Add User"}
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: { xs: 1.5, sm: 2 },
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.name || "Name"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.email || "Email"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.username || "Username"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.roles || "Roles"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.rating || "Rating"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t.admin?.status || "Status"}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                {t.admin?.actions || "Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {user.name} {user.surname}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                      {user.roles?.map((role) => (
                        <Chip
                          key={role}
                          label={role}
                          size="small"
                          color={role === "ADMIN" ? "error" : role === "TEACHER" ? "info" : "default"}
                          variant="outlined"
                        />
                      ))}
                      {user.programRoles?.map((role) => (
                        <Chip
                          key={role}
                          label={role}
                          size="small"
                          color={getRoleColor(role)}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {user.rating != null && user.rating > 0 ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Rating value={user.rating} precision={0.5} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary">
                          ({user.rating})
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.confirmed ? (
                      <Chip
                        icon={<CheckCircle />}
                        label={t.admin?.confirmed || "Confirmed"}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        icon={<HourglassEmpty />}
                        label={t.admin?.pending || "Pending"}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      {!user.confirmed && (
                        <Tooltip title={t.admin?.confirmUser || "Confirm User"}>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleConfirmUser(user.id)}
                            disabled={confirmMutation.isPending}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title={t.common?.edit || "Edit"}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t.common?.delete || "Delete"}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteConfirmId(user.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    {t.admin?.noUsers || "No users found"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          <Typography variant="h6" fontWeight={600}>
            {editingUser
              ? t.admin?.editUser || "Edit User"
              : t.admin?.addUser || "Add User"}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                label={t.register?.firstName || "First Name"}
                fullWidth
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <TextField
                label={t.register?.lastName || "Last Name"}
                fullWidth
                value={formData.surname || ""}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                required
              />
            </Box>

            <TextField
              label={t.register?.email || "Email"}
              type="email"
              fullWidth
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <TextField
              label={t.register?.usernameField || "Username"}
              fullWidth
              value={formData.username || ""}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <TextField
              label={t.register?.passwordField || "Password"}
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!editingUser}
              helperText={editingUser ? t.admin?.passwordHelper || "Leave empty to keep current password" : ""}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel>{t.admin?.programRole || "Program Role"}</InputLabel>
              <Select
                multiple
                value={formData.programRoles || []}
                label={t.admin?.programRole || "Program Role"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    programRoles: e.target.value as TYPES.ProgramRole[],
                  })
                }
              >
                <MenuItem value="TUTOR">Tutor</MenuItem>
                <MenuItem value="MENTOR">Mentor</MenuItem>
                <MenuItem value="SEEKER">Seeker</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t.admin?.userRole || "User Role"}</InputLabel>
              <Select
                multiple
                value={formData.roles || []}
                label={t.admin?.userRole || "User Role"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roles: e.target.value as TYPES.UserRole[],
                  })
                }
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="TEACHER">Teacher</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t.admin?.rating || "Rating"}
              </Typography>
              <Rating
                value={formData.rating || 0}
                precision={0.5}
                size="large"
                onChange={(_, newValue) =>
                  setFormData({ ...formData, rating: newValue || 0 })
                }
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            pt: { xs: 1, sm: 2 },
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              textTransform: "none",
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !formData.email ||
              !formData.username ||
              !formData.name ||
              !formData.surname ||
              (!editingUser && !formData.password) ||
              createMutation.isPending ||
              updateMutation.isPending
            }
            sx={{
              textTransform: "none",
              minHeight: 44,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {createMutation.isPending || updateMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingUser ? (
              t.common?.update || "Update"
            ) : (
              t.common?.create || "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        PaperProps={{
          sx: { borderRadius: 2, m: 2 },
        }}
      >
        <DialogTitle>{t.admin?.deleteConfirmTitle || "Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography>
            {t.admin?.deleteConfirmMessage || "Are you sure you want to delete this user? This action cannot be undone."}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmId(null)}>
            {t.common?.cancel || "Cancel"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteConfirmId && handleDeleteUser(deleteConfirmId)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t.common?.delete || "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsersPage;
