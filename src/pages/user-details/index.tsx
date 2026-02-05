import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "~/api/users/api";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
import { Edit, Save, Cancel, CloudUpload, Close } from "@mui/icons-material";
import { useLanguage } from "~/providers/language-provider";
import { useAuthContext } from "~/providers/auth";
import UploadImage from "~/components/upload-image";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  // Use auth context instead of separate query
  const {
    userDetails: user,
    isLoadingUserDetails: isLoading,
    fetchError,
  } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TYPES.UserResponse>({
    defaultValues: user,
    values: user, // This updates form when user data loads
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ data, files }: { data: TYPES.UpdateUserRequest; files: File[] }) =>
      updateUser(data, files),
    onSuccess: () => {
      setSuccessMessage(t.userProfile.updateSuccess);
      setIsEditing(false);
      setFiles([]);
      setProfileImage(null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Update failed:", error);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: TYPES.UserResponse) => {
    const updateData: TYPES.UpdateUserRequest = {
      programRoles: data.programRoles,
      year: data.year,
      strengths: data.strengths,
      motivation: data.motivation,
      keywords: data.keywords,
      userFeedback: data.userFeedback,
      name: data.name,
      surname: data.surname,
      workingPlace: data.workingPlace,
      workingPosition: data.workingPosition,
      experience: data.experience,
      mentoringCourseName: data.mentoringCourseName,
      courseDescription: data.courseDescription,
      expectations: data.expectations,
      hobbies: data.hobbies,
    };
    const allFiles = profileImage ? [profileImage, ...files] : files;
    updateMutation.mutate({ data: updateData, files: allFiles });
  };

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
    setSuccessMessage(null);
    setFiles([]);
    setProfileImage(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
        <Alert severity="error">{t.userProfile.loadError}</Alert>
      </Box>
    );
  }

  // const isTutor = user?.programRole?.includes("TUTOR");
  // const isMentor = user?.programRole?.includes("MENTOR");
  // const isSeeker = user?.programRole?.includes("SEEKER");
  console.log(user);
  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "0 auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
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
        <Box>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}
          >
            {t.userProfile.pageTitle}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: { xs: 0.5, sm: 1 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {t.userProfile.pageSubtitle}
          </Typography>
        </Box>

        {!isEditing && (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
            sx={{
              minHeight: 44,
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          >
            {t.common.edit}
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {successMessage}
        </Alert>
      )}

      {updateMutation.isError && (
        <Alert
          severity="error"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {t.userProfile.updateError}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}
      >
        {/* Profile Image */}
        {/* <Paper sx={{ p: 3 }}>
          <Controller
            name="profileImage"
            control={control}
            render={({ field, fieldState }) => (
              <UploadImage
                value={field.value}
                onChange={isEditing ? field.onChange : undefined}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Paper> */}

        {/* Profile Image */}
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <UploadImage
            value={profileImage}
            existingImageId={user?.data?.[0]}
            onChange={setProfileImage}
            disabled={!isEditing}
          />
        </Paper>

        {/* Basic Information */}
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {t.register.basicInfo}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 3 },
              }}
            >
              <ControlledTextField
                control={control}
                name="name"
                label={t.register.firstName}
                fullWidth
                disabled={!isEditing}
                rules={{ required: t.register.firstNameRequired }}
                error={!!errors.name}
              />

              <ControlledTextField
                control={control}
                name="surname"
                label={t.register.lastName}
                fullWidth
                disabled={!isEditing}
                rules={{ required: t.register.lastNameRequired }}
                error={!!errors.surname}
              />
            </Box>

            <ControlledTextField
              control={control}
              name="email"
              label={t.register.email}
              type="email"
              fullWidth
              disabled={!isEditing}
              rules={{
                required: t.register.emailRequired,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t.register.invalidEmailFormat,
                },
              }}
              error={!!errors.email}
            />

            <ControlledTextField
              control={control}
              name="username"
              label={t.register.usernameField}
              fullWidth
              disabled={!isEditing}
              rules={{ required: t.register.usernameRequired }}
              error={!!errors.username}
            />
          </Box>
        </Paper>

        {/* Role-specific Information */}
        {user?.programRoles?.includes("TUTOR") && (
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {t.userProfile.tutorInfo}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3 },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: { xs: 2, sm: 3 },
                }}
              >
                <ControlledTextField
                  control={control}
                  name="year"
                  label={t.register.educationalProgram}
                  fullWidth
                  disabled={!isEditing}
                />

                <ControlledTextField
                  control={control}
                  name="hobbies"
                  label={t.register.hobbies}
                  fullWidth
                  multiline
                  rows={2}
                  disabled={!isEditing}
                />
              </Box>

              <ControlledTextField
                control={control}
                name="strengths"
                label={t.register.strengths}
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="motivation"
                label={t.register.motivation}
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="courseDescription"
                label={t.register.offerToSeeker}
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="keywords"
                label={t.register.keywords}
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
                helperText={t.userProfile.keywordsHelper}
              />
            </Box>
          </Paper>
        )}

        {user?.programRoles?.includes("MENTOR") && (
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {t.userProfile.professionalInfo}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3 },
              }}
            >
              <ControlledTextField
                control={control}
                name="workingPlace"
                label={t.register.workplace}
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="workingPosition"
                label={t.register.position}
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="experience"
                label={t.register.experience}
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="strengths"
                label={t.register.strengths}
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="mentoringCourseName"
                label={t.register.mentoringCourseName}
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="courseDescription"
                label={t.register.courseDescription}
                fullWidth
                multiline
                rows={4}
                disabled={!isEditing}
              />
            </Box>
          </Paper>
        )}

        {user?.programRoles?.includes("SEEKER") && (
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {t.userProfile.seekerInfo}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3 },
              }}
            >
              <ControlledTextField
                control={control}
                name="year"
                label={t.register.educationalProgram}
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="expectations"
                label={t.register.expectations}
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />
            </Box>
          </Paper>
        )}

        {/* Documents Section */}
        {isEditing && (
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {t.register.documents}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {t.register.documentsHelper}
            </Typography>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
            />

            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                minHeight: 44,
                borderStyle: "dashed",
                mb: files.length > 0 ? 2 : 0,
              }}
            >
              {t.register.uploadFiles}
            </Button>

            {files.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <Chip
                    key={`${file.name}-${index}`}
                    label={file.name}
                    onDelete={() => handleRemoveFile(index)}
                    deleteIcon={<Close />}
                    variant="outlined"
                    sx={{ maxWidth: 200 }}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              gap: { xs: 1.5, sm: 2 },
              justifyContent: { xs: "stretch", sm: "flex-end" },
              mt: { xs: 1, sm: 2 },
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={updateMutation.isPending}
              sx={{ minHeight: 44 }}
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={(!isDirty && files.length === 0 && !profileImage) || updateMutation.isPending}
              sx={{ minHeight: 44 }}
            >
              {updateMutation.isPending ? t.common.saving : t.common.save}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
