import {
  Box,
} from "@mui/material";


import AppBar from "~/components/appbar";

// type AuthInput = {
//   email: string;
//   password: string;
// };

// const signInFormDefaultValues: AuthInput = {
//   email: "",
//   password: "",
// };

const LoginPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const { control } = useForm<AuthInput>({
  //   defaultValues: signInFormDefaultValues,
  // });
  // const navigate = useNavigate();

  // return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       bgcolor: "grey.50",
  //       py: 3,
  //     }}
  //   >
  //     <Container maxWidth="sm">
  //       <Card
  //         elevation={3}
  //         sx={{
  //           borderRadius: 2,
  //           overflow: "hidden",
  //         }}
  //       >
  //         <CardContent sx={{ p: 4 }}>
  //           <Stack gap={3} alignItems="center" component="form">
  //             <Typography
  //               variant="h4"
  //               component="h1"
  //               textAlign="center"
  //               color="primary"
  //               fontWeight="bold"
  //               mb={2}
  //             >
  //               Welcome Back
  //             </Typography>

  //             <Typography
  //               variant="body1"
  //               textAlign="center"
  //               color="text.secondary"
  //               mb={2}
  //             >
  //               Sign in to your account
  //             </Typography>

  //             <ControlledTextField
  //               name="email"
  //               control={control}
  //               label="Email"
  //               fullWidth
  //             />

  //             <ControlledTextField
  //               name="password"
  //               control={control}
  //               label="Password"
  //               type={showPassword ? "text" : "password"}
  //               fullWidth
  //               InputProps={{
  //                 endAdornment: (
  //                   <InputAdornment position="end">
  //                     <IconButton
  //                       aria-label="toggle password visibility"
  //                       onClick={() => setShowPassword((show) => !show)}
  //                       edge="end"
  //                     >
  //                       {showPassword ? <VisibilityOff /> : <Visibility />}
  //                     </IconButton>
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />

  //             <Typography
  //               alignSelf="flex-end"
  //               sx={{
  //                 cursor: "pointer",
  //                 color: "primary.main",
  //                 "&:hover": {
  //                   textDecoration: "underline",
  //                 },
  //               }}
  //             >
  //               Forgot Password?
  //             </Typography>

  //             <Button
  //               type="submit"
  //               variant="contained"
  //               fullWidth
  //               size="large"
  //               sx={{
  //                 mt: 2,
  //                 py: 1.5,
  //                 fontSize: "1.1rem",
  //                 fontWeight: "medium",
  //               }}
  //             >
  //               "Sign in"
  //             </Button>

  //             <Box
  //               display="flex"
  //               alignItems="center"
  //               width="100%"
  //               gap={2}
  //               my={2}
  //             >
  //               <Divider sx={{ flex: 1 }} />
  //               <Typography variant="body2" color="textSecondary">
  //                 Or
  //               </Typography>
  //               <Divider sx={{ flex: 1 }} />
  //             </Box>

  //             <Box display="flex" alignItems="center" gap={1}>
  //               <Typography color="text.secondary">
  //                 Don&apos;t have an account?
  //               </Typography>
  //               <Button
  //                 onClick={() => navigate(paths.register)}
  //                 variant="text"
  //                 sx={{
  //                   textTransform: "none",
  //                   fontWeight: "medium",
  //                 }}
  //               >
  //                 Sign up
  //               </Button>
  //             </Box>
  //           </Stack>
  //         </CardContent>
  //       </Card>
  //     </Container>
  //   </Box>
  // );
  return (
    <Box>
      <AppBar />
    </Box>
  );
};

export default LoginPage;
