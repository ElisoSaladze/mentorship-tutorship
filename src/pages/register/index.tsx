import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { RegisterType } from "~/api/auth/api";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultValues: RegisterType = {
  username: "",
  password: "",
  repeatPassword: "",
  roles: [],
  programRoles: ["SEEKER"],
  confirmed: false,
};

const RegisterPage = () => {
  const location = useLocation();
  const registrationType = location.state?.type || null;

  const { control } = useForm({
    defaultValues: defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const getRegistrationTitle = () => {
    if (!registrationType) return "Create Your Account";
    return `Register as ${
      registrationType.charAt(0).toUpperCase() + registrationType.slice(1)
    }`;
  };

  const getRegistrationDescription = () => {
    switch (registrationType) {
      case "mentor":
        return "Share your experience and guide students in their career journey";
      case "tutor":
        return "Help students excel academically by providing tutoring services";
      case "seeker":
        return "Find mentors and tutors to support your academic and career goals";
      default:
        return "Find mentors and tutors to support your academic and career goals";
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <ControlledTextField
          control={control}
          name="username"
          label="Username"
          fullWidth
          helperText="Choose a unique username"
        />

        <ControlledTextField
          control={control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          helperText="Must be at least 8 characters"
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

        <ControlledTextField
          control={control}
          name="repeatPassword"
          label="Confirm Password"
          type={showRepeatPassword ? "text" : "password"}
          fullWidth
          helperText="Re-enter your password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repeat password visibility"
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

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button variant="contained" size="large" fullWidth>
            Create Account
          </Button>
          <Button variant="outlined" size="large" fullWidth>
            Cancel
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
