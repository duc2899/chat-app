import { Box, Stack, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";

import LoginForm from "../../sections/auth/LoginForm";
import AuthSocial from "../../sections/auth/AuthSocial";
const Login = () => {
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
          Login to Tawk
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
          New user?
          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
            color={theme.palette.primary.main}
            fontWeight={700}
          >
            Create an account
          </Link>
        </Typography>
      </Stack>
      {/* Login form */}
      <LoginForm></LoginForm>
      {/* Social */}
      <AuthSocial></AuthSocial>
    </Box>
  );
};

export default Login;
