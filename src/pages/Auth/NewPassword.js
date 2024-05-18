import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";
import logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const NewPassword = () => {
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
          Reset Password
        </Typography>
        <Typography
          component="div"
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
          }}
        >
          Please set your new password
        </Typography>
      </Stack>
      {/* ResetPassword Form */}
      <NewPasswordForm></NewPasswordForm>
      <Link
        component={RouterLink}
        to={"/auth/login"}
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "subtitle2",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CaretLeft></CaretLeft>
        Return to sign in
      </Link>
    </Box>
  );
};

export default NewPassword;
