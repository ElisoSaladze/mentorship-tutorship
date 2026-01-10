import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Divider,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "~/api/auth/api";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
import { Visibility, VisibilityOff, InfoOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "~/providers/auth";
import { useLanguage } from "~/providers/language-provider";

const defaultValues: TYPES.RegisterFormData = {
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  userRole: "STUDENT",
  programRole: "SEEKER",
  year: "",
  strengths: "",
  motivation: "",
  keywords: "",
  userFeedback: "",
  name: "",
  surname: "",
  workingPlace: "",
  workingPosition: "",
  experience: "",
  mentoringCourseName: "",
  courseDescription: "",
  expectations: "",
  hobbies: "",
};

const RegisterPage = () => {
  const { authorize } = useAuthContext();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const registrationType = location.state?.type || "seeker";

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const password = watch("password");

  const getRegistrationTitle = () => {
    switch (registrationType) {
      case "tutor":
        return t.register.tutorRegistration;
      case "mentor":
        return t.register.mentorRegistration;
      case "seeker":
        return t.register.seekerRegistration;
      default:
        return t.register.registration;
    }
  };

  const getRegistrationDescription = () => {
    switch (registrationType) {
      case "tutor":
        return t.register.tutorDescription;
      case "mentor":
        return t.register.mentorDescription;
      case "seeker":
        return t.register.seekerDescription;
      default:
        return t.register.seekerDescription;
    }
  };

  const getWhoCanBecomeInfo = () => {
    switch (registrationType) {
      case "tutor":
        return {
          title: t.register.whoCanBecomeTutor,
          items: t.register.tutorAnswers,
        };
      case "mentor":
        return {
          title: t.register.whoCanBecomeMentor,
          items: t.register.mentorAnswers,
        };
      case "seeker":
        return {
          title: t.register.whoCanBecomeSeeker,
          items: t.register.seekerAnswers,
        };
      default:
        return null;
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      authorize(data);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const onSubmit = (data: TYPES.RegisterFormData) => {
    setError(null);

    if (data.password !== data.repeatPassword) {
      setError(t.register.passwordsDoNotMatch);
      return;
    }

    if (data.password.length < 8) {
      setError(t.register.minEightChars);
      return;
    }

    const programRoleMap: Record<string, TYPES.ProgramRole> = {
      tutor: "TUTOR",
      mentor: "MENTOR",
      seeker: "SEEKER",
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword: _, ...registerData } = data;
    const submissionData: TYPES.RegisterRequest = {
      ...registerData,
      programRole: programRoleMap[registrationType] || "SEEKER",
    };

    registerMutation.mutate(submissionData);
  };

  const isTutor = registrationType === "tutor";
  const isMentor = registrationType === "mentor";
  const isSeeker = registrationType === "seeker";
  const whoCanBecomeInfo = getWhoCanBecomeInfo();

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "0 auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}
          >
            {getRegistrationTitle()}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {getRegistrationDescription()}
        </Typography>
      </Box>

      {/* Who Can Become Info Card */}
      {whoCanBecomeInfo && (
        <Card
          sx={{
            mb: { xs: 3, sm: 4 },
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(33, 150, 243, 0.1)"
                : "rgba(33, 150, 243, 0.05)",
            borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <InfoOutlined color="primary" />
              <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
              >
                {whoCanBecomeInfo.title}
              </Typography>
            </Box>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {whoCanBecomeInfo.items.map((item, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    lineHeight: 1.7,
                    fontSize: { xs: "0.875rem", sm: "0.9rem" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2.5, sm: 3 },
        }}
      >
        {/* Basic Information */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {t.register.basicInfo}
        </Typography>

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
            rules={{ required: t.register.firstNameRequired }}
            error={!!errors.name}
          />

          <ControlledTextField
            control={control}
            name="surname"
            label={t.register.lastName}
            fullWidth
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
          rules={{
            required: t.register.emailRequired,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t.register.invalidEmailFormat,
            },
          }}
          error={!!errors.email}
        />

        {/* Tutor Registration */}
        {isTutor && (
          <>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {t.register.tutorInfo}
            </Typography>

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
                helperText={t.register.educationalProgramHelper}
                rules={{ required: t.register.fieldRequired }}
                error={!!errors.year}
              />

              <ControlledTextField
                control={control}
                name="hobbies"
                label={t.register.hobbies}
                fullWidth
                helperText={t.register.hobbiesHelper}
              />
            </Box>

            <ControlledTextField
              control={control}
              name="strengths"
              label={t.register.strengths}
              fullWidth
              multiline
              rows={2}
              helperText={t.register.academicStrengthsHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.strengths}
            />

            <ControlledTextField
              control={control}
              name="motivation"
              label={t.register.motivation}
              fullWidth
              multiline
              rows={3}
              helperText={t.register.motivationHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.motivation}
            />

            <ControlledTextField
              control={control}
              name="courseDescription"
              label={t.register.offerToSeeker}
              fullWidth
              multiline
              rows={3}
              helperText={t.register.offerToSeekerHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.courseDescription}
            />

            <ControlledTextField
              control={control}
              name="keywords"
              label={t.register.keywords}
              fullWidth
              helperText={t.register.keywordsHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.keywords}
            />

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">{t.register.tutorNote}</Typography>
            </Alert>
          </>
        )}

        {/* Mentor Registration */}
        {isMentor && (
          <>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {t.register.professionalInfo}
            </Typography>

            <ControlledTextField
              control={control}
              name="workingPlace"
              label={t.register.workplace}
              fullWidth
              helperText={t.register.workplaceHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.workingPlace}
            />

            <ControlledTextField
              control={control}
              name="workingPosition"
              label={t.register.position}
              fullWidth
              helperText={t.register.positionHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.workingPosition}
            />

            <ControlledTextField
              control={control}
              name="experience"
              label={t.register.experience}
              fullWidth
              multiline
              rows={3}
              helperText={t.register.experienceHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.experience}
            />

            <ControlledTextField
              control={control}
              name="strengths"
              label={t.register.strengths}
              fullWidth
              multiline
              rows={2}
              helperText={t.register.professionalStrengthsHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.strengths}
            />

            <ControlledTextField
              control={control}
              name="mentoringCourseName"
              label={t.register.mentoringCourseName}
              fullWidth
              helperText={t.register.mentoringCourseNameHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.mentoringCourseName}
            />

            <ControlledTextField
              control={control}
              name="courseDescription"
              label={t.register.courseDescription}
              fullWidth
              multiline
              rows={4}
              helperText={t.register.courseDescriptionHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.courseDescription}
            />
          </>
        )}

        {/* Seeker Registration */}
        {isSeeker && (
          <>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {t.register.seekerInfo}
            </Typography>

            <ControlledTextField
              control={control}
              name="year"
              label={t.register.educationalProgram}
              fullWidth
              helperText={t.register.seekerEducationalProgramHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.year}
            />

            <ControlledTextField
              control={control}
              name="expectations"
              label={t.register.expectations}
              fullWidth
              multiline
              rows={3}
              helperText={t.register.expectationsHelper}
              rules={{ required: t.register.fieldRequired }}
              error={!!errors.expectations}
            />
          </>
        )}

        {/* Feedback Section */}
        {isTutor && (
          <>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {t.register.seekerFeedback}
            </Typography>

            <ControlledTextField
              control={control}
              name="userFeedback"
              label={t.register.programEvaluation}
              fullWidth
              multiline
              rows={4}
              helperText={t.register.programEvaluationHelper}
            />
          </>
        )}

        {/* Account Credentials */}
        <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {t.register.accountCredentials}
        </Typography>

        <ControlledTextField
          control={control}
          name="username"
          label={t.register.usernameField}
          fullWidth
          helperText={t.register.usernameHelper}
          rules={{
            required: t.register.usernameRequired,
            minLength: {
              value: 3,
              message: t.register.minThreeChars,
            },
          }}
          error={!!errors.username}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, sm: 3 },
          }}
        >
          <ControlledTextField
            control={control}
            name="password"
            label={t.register.passwordField}
            type={showPassword ? "text" : "password"}
            fullWidth
            helperText={t.register.minEightChars}
            rules={{
              required: t.register.passwordFieldRequired,
              minLength: {
                value: 8,
                message: t.register.minEightChars,
              },
            }}
            error={!!errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      sx={{ width: 44, height: 44 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <ControlledTextField
            control={control}
            name="repeatPassword"
            label={t.register.repeatPassword}
            type={showRepeatPassword ? "text" : "password"}
            fullWidth
            helperText={t.register.repeatPassword}
            rules={{
              required: t.register.repeatPasswordRequired,
              validate: (value: string) =>
                value === password || t.register.passwordsDoNotMatch,
            }}
            error={!!errors.repeatPassword}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowRepeatPassword((show) => !show)}
                      edge="end"
                      sx={{ width: 44, height: 44 }}
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mt: { xs: 2, sm: 3 },
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              minHeight: 48,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            {isSubmitting ? t.register.registering : t.register.registerButton}
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleCancel}
            disabled={isSubmitting}
            sx={{
              minHeight: 48,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            {t.common.cancel}
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: { xs: 2, sm: 3 },
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {t.register.termsAgreement}
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
