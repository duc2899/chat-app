import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import settingImage from "../assets/Images/Call Service.png";
const ConversationStart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"column"} alignItems={"center"}>
        <img src={settingImage} alt="settingImage"></img>
        <Typography
          variant="body2"
          sx={{
            display: "inline-flex",
            gap: "3px",
            fontWeight: "bold",
          }}
        >
          Select a conversation or start a{" "}
          <Typography
            color={theme.palette.primary.main}
            variant="body2"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            new one
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ConversationStart;
