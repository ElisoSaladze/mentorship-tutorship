import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUserById } from "~/api/users/api";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
// import UploadImage from "~/components/upload-image";
import { Edit, Save, Cancel } from "@mui/icons-material";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch current user data
  const {
    data: user,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TYPES.user>({
    defaultValues: user,
    values: user, // This updates form when user data loads
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: (data: TYPES.user) => updateUserById(data.id!, data),
    onSuccess: () => {
      setSuccessMessage("პროფილი წარმატებით განახლდა");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Update failed:", error);
    },
  });

  const onSubmit = (data: TYPES.user) => {
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
    setSuccessMessage(null);
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
        <Alert severity="error">
          მონაცემების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.
        </Alert>
      </Box>
    );
  }

  const isTutor = user?.programRole?.includes("TUTOR");
  const isMentor = user?.programRole?.includes("MENTOR");
  const isSeeker = user?.programRole?.includes("SEEKER");

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            ჩემი პროფილი
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            თქვენი პირადი ინფორმაციის მართვა
          </Typography>
        </Box>

        {!isEditing && (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
          >
            რედაქტირება
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {updateMutation.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          პროფილის განახლება ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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

        {/* Basic Information */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            ძირითადი ინფორმაცია
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <ControlledTextField
                control={control}
                name="name"
                label="სახელი"
                fullWidth
                disabled={!isEditing}
                rules={{ required: "სახელი აუცილებელია" }}
                error={!!errors.name}
              />

              <ControlledTextField
                control={control}
                name="surname"
                label="გვარი"
                fullWidth
                disabled={!isEditing}
                rules={{ required: "გვარი აუცილებელია" }}
                error={!!errors.surname}
              />
            </Box>

            <ControlledTextField
              control={control}
              name="email"
              label="ელ. ფოსტა"
              type="email"
              fullWidth
              disabled={!isEditing}
              rules={{
                required: "ელ. ფოსტა აუცილებელია",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "არასწორი ელ. ფოსტის ფორმატი",
                },
              }}
              error={!!errors.email}
            />

            <ControlledTextField
              control={control}
              name="username"
              label="მომხმარებლის სახელი"
              fullWidth
              disabled={!isEditing}
              rules={{ required: "მომხმარებლის სახელი აუცილებელია" }}
              error={!!errors.username}
            />
          </Box>
        </Paper>

        {/* Role-specific Information */}
        {isTutor && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              ტუტორის ინფორმაცია
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <ControlledTextField
                  control={control}
                  name="year"
                  label="საგანმანათლებლო პროგრამა და სწავლების წელი"
                  fullWidth
                  disabled={!isEditing}
                />

                <ControlledTextField
                  control={control}
                  name="hobbies"
                  label="ჰობი"
                  fullWidth
                  disabled={!isEditing}
                />
              </Box>

              <ControlledTextField
                control={control}
                name="strengths"
                label="ძლიერი მხარეები"
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="motivation"
                label="მოტივაცია"
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="courseDescription"
                label="რას სთავაზობთ მაძიებელს"
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="keywords"
                label="საკვანძო სიტყვები"
                fullWidth
                disabled={!isEditing}
                helperText="მიუთითეთ საკვანძო სიტყვები მძიმით გამოყოფილი"
              />
            </Box>
          </Paper>
        )}

        {isMentor && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              პროფესიული ინფორმაცია
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ControlledTextField
                control={control}
                name="workingPlace"
                label="სამუშაო ადგილი"
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="workingPosition"
                label="პოზიცია"
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="experience"
                label="გამოცდილება"
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="strengths"
                label="ძლიერი მხარეები"
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="mentoringCourseName"
                label="მენტორობის კურსის დასახელება"
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="courseDescription"
                label="კურსის აღწერა"
                fullWidth
                multiline
                rows={4}
                disabled={!isEditing}
              />
            </Box>
          </Paper>
        )}

        {isSeeker && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              მაძიებლის ინფორმაცია
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ControlledTextField
                control={control}
                name="year"
                label="საგანმანათლებლო პროგრამა და სწავლების წელი"
                fullWidth
                disabled={!isEditing}
              />

              <ControlledTextField
                control={control}
                name="expectations"
                label="თქვენი მოლოდინი მენტორისგან/ტუტორისგან"
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
              />
            </Box>
          </Paper>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={updateMutation.isPending}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={!isDirty || updateMutation.isPending}
            >
              {updateMutation.isPending ? "მიმდინარეობს..." : "შენახვა"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
