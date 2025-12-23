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
  });

  const onSubmit = (data: AuthInput) => {
    loginMutation.mutate(data);
  };

  return (
    <Box>
      <Box
        sx={{
          minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
          <Card
            elevation={3}
            sx={{
              borderRadius: { xs: 2, sm: 3 },
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Stack
                gap={{ xs: 2.5, sm: 3 }}
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
                  sx={{
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
                  }}
                >
                  {t.login.welcomeBack}
                </Typography>

                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.secondary"
                  sx={{
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {t.login.signInToAccount}
                </Typography>

                {successMessage && (
                  <Alert severity="success" sx={{ width: "100%", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    {successMessage}
                  </Alert>
                )}

                {loginMutation.isError && (
                  <Alert severity="error" sx={{ width: "100%", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
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
                            sx={{ width: 44, height: 44 }}
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
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    py: 0.5,
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
                    mt: { xs: 1, sm: 2 },
                    py: { xs: 1.25, sm: 1.5 },
                    minHeight: 48,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
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
                  my={{ xs: 1.5, sm: 2 }}
                >
                  <Divider sx={{ flex: 1 }} />
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                    {t.common.or}
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                  gap={0.5}
                  sx={{ textAlign: "center" }}
                >
                  <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    {t.login.noAccount}
                  </Typography>
                  <Button
                    onClick={() => navigate(paths.register)}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      minHeight: 44,
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
