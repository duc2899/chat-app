import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ResendOTP } from "../../redux/slices/auth";

const CountDown = () => {
  const dispatch = useDispatch();
  const { timeExpired, userId } = useSelector((store) => store.auth);
  const theme = useTheme();
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false); // Trạng thái kích hoạt đếm ngược
  useEffect(() => {
    let interval;
    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTimerActive(false); // Tắt đếm ngược khi hết thời gian
    }

    return () => clearInterval(interval); // Hủy đăng ký interval khi component unmount
  }, [timerActive, time]);
  useEffect(() => {
    if (timeExpired > 0) {
      setTimerActive(true);
      setTime(60 * timeExpired);
    }
  }, [timeExpired]);

  const handelResendOTP = () => {
    dispatch(
      ResendOTP({
        userId: userId,
      })
    );
  };
  return (
    <Stack
      width={"100%"}
      justifyContent={"flex-end"}
      sx={{
        mb: 2,
      }}
    >
      {!timerActive ? (
        <Typography
          fontSize={14}
          fontWeight={700}
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          Didn't receive code ?
          <Typography
            sx={{
              cursor: "pointer",
            }}
            fontSize={14}
            fontWeight={700}
            color={theme.palette.primary.main}
            onClick={handelResendOTP}
          >
            Resend OTP
          </Typography>
        </Typography>
      ) : (
        <Typography
          variant="subtitle2"
          fontSize={14}
          fontWeight={700}
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          Expire in:{" "}
          {Math.floor(time / 60) > 0 && (
            <Typography fontSize={14} fontWeight={700}>
              {Math.floor(time / 60) >= 10
                ? Math.floor(time / 60)
                : "0" + Math.floor(time / 60)}{" "}
              m
            </Typography>
          )}
          {time % 60 >= 10 ? time % 60 : "0" + (time % 60)} s
        </Typography>
      )}
    </Stack>
  );
};

export default CountDown;
