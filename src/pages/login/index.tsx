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
import { useLanguage } from "~/providers/language-provider";

const signInFormDefaultValues: AuthInput = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { authorize } = useAuthContext();
  const { t } = useLanguage();
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
                  {t.login.welcomeBack}
                </Typography>

                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.secondary"
                  mb={2}
                >
                  {t.login.signInToAccount}
                </Typography>

                {successMessage && (
                  <Alert severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                  </Alert>
                )}

                {loginMutation.isError && (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {loginMutation.error?.message || t.login.invalidCredentials}
                  </Alert>
                )}

                <ControlledTextField
                  name="username"
                  control={control}
                  label={t.login.username}
                  fullWidth
                  rules={{
                    required: t.login.usernameRequired,
                  }}
                  error={!!errors.username}
                />

                <ControlledTextField
                  name="password"
                  control={control}
                  label={t.login.password}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  rules={{
                    required: t.login.passwordRequired,
                  }}
                  error={!!errors.password}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={t.login.togglePasswordVisibility}
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
                  {t.login.forgotPassword}
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
                  {loginMutation.isPending ? t.login.signingIn : t.login.signIn}
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
                    {t.common.or}
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="text.secondary">
                    {t.login.noAccount}
                  </Typography>
                  <Button
                    onClick={() => navigate(paths.register)}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                    }}
                  >
                    {t.login.signUp}
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
