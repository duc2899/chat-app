import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import logo from "../../assets/Images/logo.ico";
import OTPForm from "../../sections/auth/OTPForm";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CountDown from "../../sections/auth/CountDown";

const VerifyOTP = () => {
  const theme = useTheme();
  const { email } = useSelector((get) => get.auth);
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
          Please Verify OTP
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
          Sent to email{" "}
          <Typography
            variant="subtitle2"
            fontSize={14}
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            {email}
          </Typography>
        </Typography>
      </Stack>
      {/* CountDown */}
      <CountDown></CountDown>
      {/* OTP form */}
      <OTPForm></OTPForm>
    </Box>
  );
};

export default VerifyOTP;
