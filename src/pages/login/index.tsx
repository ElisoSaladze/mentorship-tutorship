import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ControlledTextField } from "~/components/form/controlled/controlled-text-field";
import { auth, AuthInput } from "~/api/auth/api";
import { paths } from "~/app/routes/paths";
import { useAuthContext } from "~/providers/auth";

const signInFormDefaultValues: AuthInput = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { authorize } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInput>({
    defaultValues: signInFormDefaultValues,
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Get success message from navigation state (from registration)
  const successMessage = location.state?.message;

  const loginMutation = useMutation({
    mutationFn: auth,
    onSuccess: (data) => {
      authorize(data);
      navigate(paths.userDetails);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: AuthInput) => {
    loginMutation.mutate(data);
  };

  return (
    <Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          py: 3,
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                gap={3}
                alignItems="center"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  textAlign="center"
                  color="primary"
                  fontWeight="bold"
                  mb={2}
                >
                  Welcome Back
                </Typography>

                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.secondary"
                  mb={2}
                >
                  Sign in to your account
                </Typography>

                {successMessage && (
                  <Alert severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                  </Alert>
                )}

                {loginMutation.isError && (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {loginMutation.error?.message ||
                      "Invalid username or password. Please try again."}
                  </Alert>
                )}

                <ControlledTextField
                  name="username"
                  control={control}
                  label="Username"
                  fullWidth
                  rules={{
                    required: "Username is required",
                  }}
                  error={!!errors.username}
                />

                <ControlledTextField
                  name="password"
                  control={control}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  rules={{
                    required: "Password is required",
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
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Typography
                  alignSelf="flex-end"
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loginMutation.isPending}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "medium",
                  }}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>

                <Box
                  display="flex"
                  alignItems="center"
                  width="100%"
                  gap={2}
                  my={2}
                >
                  <Divider sx={{ flex: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    Or
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="text.secondary">
                    Don&apos;t have an account?
                  </Typography>
                  <Button
                    onClick={() => navigate(paths.register)}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
