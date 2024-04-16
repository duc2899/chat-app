import { Box, Stack, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import RegisterForm from "../../sections/auth/RegisterForm";
const Register = () => {
  const theme = useTheme();
  return (
    <Box width={"60%"}>
      <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
        <img src={logo} alt="logo" width={100} />
      </Stack>
      <Stack
        sx={{
          marginTop: 4,
          marginBottom: 3,
        }}
      >
        <Typography variant="subtitle2" fontSize={25} fontWeight={800}>
          Get Started With Tawk
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={14}
          fontWeight={700}
          sx={{
            display: "flex",
            gap: "5px",
            marginTop: "10px",
          }}
        >
          Already have an account?
          <Link
            to={"/auth/login"}
            component={RouterLink}
            variant="subtitle2"
            color={theme.palette.primary.main}
            fontWeight={700}
          >
            Sign in
          </Link>
        </Typography>
      </Stack>
      {/* Register form */}
      <RegisterForm></RegisterForm>
      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link
          underline="always"
          color="text.primary"
          sx={{
            cursor: "pointer",
          }}
        >
          Terms of Service
        </Link>
        {" and "}
        <Link
          underline="always"
          color="text.primary"
          sx={{
            cursor: "pointer",
          }}
        >
          Privacy Policy
        </Link>
        .
      </Typography>
      {/* Social */}
      <AuthSocial></AuthSocial>
    </Box>
  );
};

export default Register;
