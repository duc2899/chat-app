import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { UpdateSettingType } from "../../redux/slices/app";
import { useTheme } from "@mui/material/styles";
import { CaretLeft, ClipboardText } from "phosphor-react";
const RequestAccountPanel = () => {
  const theme = useTheme();
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton
          sx={{
            color: "currentColor",
          }}
          onClick={() => UpdateSettingType("SETTING")()}
        >
          <CaretLeft weight="bold" size={28}></CaretLeft>
        </IconButton>
        <Typography
          variant="subtitle2"
          fontSize={28}
          sx={{
            fontWeight: "bold",
          }}
        >
          Request Account Info
        </Typography>
      </Stack>
      <Stack
        width={"100%"}
        sx={{
          paddingTop: 3,
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          p={4}
          sx={{
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <ClipboardText
            size={70}
            color={theme.palette.common.white}
          ></ClipboardText>
        </Stack>
      </Stack>
      <Stack spacing={2} p={2}>
        <Typography variant="subtitle2" fontWeight={"700"} fontSize={16}>
          Request Report
        </Typography>
        <Typography
          variant="caption"
          fontSize={12}
          color={theme.palette.grey[600]}
        >
          Create a report of your Talk Account Information and settings, which
          you can access or port to another app. This report does not include
          your messages.
        </Typography>
      </Stack>
    </Box>
  );
};

export default RequestAccountPanel;
