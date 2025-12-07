import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "~/api/auth/api";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
// import UploadImage from "~/components/upload-image";
import { useAuthContext } from "~/providers/auth";

const defaultValues: TYPES.user = {
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  userRole: "STUDENT",
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
  roles: [],
  programRole: "SEEKER",
  confirmed: false,
};

const RegisterPage = () => {
  const { authorize } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const registrationType = location.state?.type || "seeker"; // tutor, mentor, seeker

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
        return "ტუტორის რეგისტრაცია";
      case "mentor":
        return "მენტორის რეგისტრაცია";
      case "seeker":
        return "მაძიებლის რეგისტრაცია";
      default:
        return "რეგისტრაცია";
    }
  };

  const getRegistrationDescription = () => {
    switch (registrationType) {
      case "tutor":
        return "გაუზიარეთ თქვენი ცოდნა სტუდენტებს და დაეხმარეთ მათ აკადემიურ წარმატებაში";
      case "mentor":
        return "გახდით მენტორი და დაეხმარეთ სტუდენტებს პროფესიულ განვითარებაში";
      case "seeker":
        return "იპოვეთ მენტორი ან ტუტორი თქვენი აკადემიური და კარიერული მიზნების მისაღწევად";
      default:
        return "იპოვეთ მენტორი ან ტუტორი თქვენი აკადემიური და კარიერული მიზნების მისაღწევად";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: TYPES.user) => {
    setError(null);

    // Validate password match
    if (data.password !== data.repeatPassword) {
      setError("პაროლები არ ემთხვევა");
      return;
    }

    // Validate password length
    if (data.password.length < 8) {
      setError("პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს");
      return;
    }

    // Map registration type to programRole
    const programRoleMap: Record<string, string> = {
      tutor: "TUTOR",
      mentor: "MENTOR",
      seeker: "SEEKER",
    };

    // Set programRole based on registration type
    const submissionData = {
      ...data,
      programRole: programRoleMap[registrationType] || "SEEKER",
    };

    registerMutation.mutate(submissionData);
  };

  const isTutor = registrationType === "tutor";
  const isMentor = registrationType === "mentor";
  const isSeeker = registrationType === "seeker";

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 4,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography variant="h4" fontWeight={600}>
            {getRegistrationTitle()}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {getRegistrationDescription()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* Basic Information */}
        <Typography variant="h6" fontWeight={600}>
          ძირითადი ინფორმაცია
        </Typography>
        {/* <UploadImage /> */}
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
            rules={{ required: "სახელი აუცილებელია" }}
            error={!!errors.name}
          />

          <ControlledTextField
            control={control}
            name="surname"
            label="გვარი"
            fullWidth
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
          rules={{
            required: "ელ. ფოსტა აუცილებელია",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "არასწორი ელ. ფოსტის ფორმატი",
            },
          }}
          error={!!errors.email}
        />

        {/* Tutor Registration */}
        {isTutor && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              ტუტორის ინფორმაცია
            </Typography>

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
                helperText="მაგ.: ინფორმატიკა, მე-3 კურსი"
                rules={{ required: "ეს ველი აუცილებელია" }}
                error={!!errors.year}
              />

              <ControlledTextField
                control={control}
                name="hobbies"
                label="ჰობი"
                fullWidth
                helperText="თქვენი ინტერესები და ჰობი"
              />
            </Box>

            <ControlledTextField
              control={control}
              name="strengths"
              label="ძლიერი მხარეები"
              fullWidth
              multiline
              rows={2}
              helperText="აღწერეთ თქვენი აკადემიური ძლიერი მხარეები"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.strengths}
            />

            <ControlledTextField
              control={control}
              name="motivation"
              label="მოტივაცია"
              fullWidth
              multiline
              rows={3}
              helperText="აღწერეთ, რატომ გსურთ ტუტორობის პროგრამაში ჩართვა"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.motivation}
            />

            <ControlledTextField
              control={control}
              name="courseDescription"
              label="რას სთავაზობთ მაძიებელს"
              fullWidth
              multiline
              rows={3}
              helperText="მაგალითად: შემიძლია დავეხმარო სტუდენტებს უმაღლესი მათემატიკის შესწავლაში"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.courseDescription}
            />

            <ControlledTextField
              control={control}
              name="keywords"
              label="საკვანძო სიტყვები"
              fullWidth
              helperText="მიუთითეთ საკვანძო სიტყვები მძიმით გამოყოფილი (მაგ.: მათემატიკა, ფიზიკა, პროგრამირება)"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.keywords}
            />

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>შენიშვნა:</strong> ტუტორობის სტატუსის მოპოვება შეუძლია
                მხოლოდ იმ სტუდენტს, რომლის საშუალო შეწონილი ქულა 81-ზე მეტია
              </Typography>
            </Alert>
          </>
        )}

        {/* Mentor Registration */}
        {isMentor && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              პროფესიული ინფორმაცია
            </Typography>

            <ControlledTextField
              control={control}
              name="workingPlace"
              label="სამუშაო ადგილი"
              fullWidth
              helperText="ორგანიზაცია ან დაწესებულება"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.workingPlace}
            />

            <ControlledTextField
              control={control}
              name="workingPosition"
              label="პოზიცია"
              fullWidth
              helperText="თქვენი თანამდებობა"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.workingPosition}
            />

            <ControlledTextField
              control={control}
              name="experience"
              label="გამოცდილება"
              fullWidth
              multiline
              rows={3}
              helperText="აღწერეთ თქვენი პროფესიული გამოცდილება"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.experience}
            />

            <ControlledTextField
              control={control}
              name="strengths"
              label="ძლიერი მხარეები"
              fullWidth
              multiline
              rows={2}
              helperText="თქვენი პროფესიული ძლიერი მხარეები"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.strengths}
            />

            <ControlledTextField
              control={control}
              name="mentoringCourseName"
              label="მენტორობის კურსის დასახელება"
              fullWidth
              helperText="კურსის ან პროგრამის დასახელება"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.mentoringCourseName}
            />

            <ControlledTextField
              control={control}
              name="courseDescription"
              label="კურსის აღწერა"
              fullWidth
              multiline
              rows={4}
              helperText="მიზნები, შედეგები, შინაარსი, კურსის დაძლევის პირობები, განრიგი, შეხვედრების ფორმატი"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.courseDescription}
            />
          </>
        )}

        {/* Seeker Registration */}
        {isSeeker && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              მაძიებლის ინფორმაცია
            </Typography>

            <ControlledTextField
              control={control}
              name="year"
              label="საგანმანათლებლო პროგრამა და სწავლების წელი"
              fullWidth
              helperText="მაგ.: ბიზნესის ადმინისტრირება, მე-2 კურსი"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.year}
            />

            <ControlledTextField
              control={control}
              name="expectations"
              label="თქვენი მოლოდინი მენტორისგან/ტუტორისგან"
              fullWidth
              multiline
              rows={3}
              helperText="აღწერეთ, რა დახმარებას ელოდებით"
              rules={{ required: "ეს ველი აუცილებელია" }}
              error={!!errors.expectations}
            />
          </>
        )}

        {/* Feedback Section (visible for tutors only after completion) */}
        {isTutor && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              მაძიებლის უკუკავშირი
            </Typography>

            <ControlledTextField
              control={control}
              name="userFeedback"
              label="პროგრამის შეფასება"
              fullWidth
              multiline
              rows={4}
              helperText="დაასახელეთ პროგრამის პოზიტიური ასპექტები და რეკომენდაციები პროგრამის ეფექტიანობის ასამაღლებლად"
            />
          </>
        )}

        {/* Account Credentials */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight={600}>
          ანგარიშის მონაცემები
        </Typography>

        <ControlledTextField
          control={control}
          name="username"
          label="მომხმარებლის სახელი"
          fullWidth
          helperText="აირჩიეთ უნიკალური მომხმარებლის სახელი"
          rules={{
            required: "მომხმარებლის სახელი აუცილებელია",
            minLength: {
              value: 3,
              message: "მინიმუმ 3 სიმბოლო",
            },
          }}
          error={!!errors.username}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          <ControlledTextField
            control={control}
            name="password"
            label="პაროლი"
            type={showPassword ? "text" : "password"}
            fullWidth
            helperText="მინიმუმ 8 სიმბოლო"
            rules={{
              required: "პაროლი აუცილებელია",
              minLength: {
                value: 8,
                message: "მინიმუმ 8 სიმბოლო",
              },
            }}
            error={!!errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="პაროლის ხილვადობა"
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

          <ControlledTextField
            control={control}
            name="repeatPassword"
            label="გაიმეორეთ პაროლი"
            type={showRepeatPassword ? "text" : "password"}
            fullWidth
            helperText="გაიმეორეთ პაროლი"
            rules={{
              required: "გაიმეორეთ პაროლი",
              validate: (value: string) =>
                value === password || "პაროლები არ ემთხვევა",
            }}
            error={!!errors.repeatPassword}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="პაროლის ხილვადობა"
                      onClick={() => setShowRepeatPassword((show) => !show)}
                      edge="end"
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
            mt: 2,
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "მიმდინარეობს..." : "რეგისტრაცია"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            გაუქმება
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          ანგარიშის შექმნით თქვენ ეთანხმებით ჩვენს მომსახურების პირობებს და
          კონფიდენციალურობის პოლიტიკას
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
