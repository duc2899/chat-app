import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  CaretLeft,
  ChatCircleDots,
  CircleDashed,
  LinkSimpleBreak,
  Lock,
  MapPin,
  Phone,
} from "phosphor-react";
import React from "react";
import { UpdateSettingType } from "../../redux/slices/app";
import { useTheme } from "@mui/material/styles";
const SecurityPanel = () => {
  const theme = useTheme();
  const List = [
    {
      key: 0,
      icon: <ChatCircleDots size={24}></ChatCircleDots>,
      title: "Text and voice messages",
    },
    {
      key: 1,
      icon: <Phone size={24}></Phone>,
      title: "Audio & Video Calls",
    },
    {
      key: 2,
      icon: <LinkSimpleBreak size={24}></LinkSimpleBreak>,
      title: "Photos, videos & documents",
    },
    {
      key: 3,
      icon: <MapPin size={24}></MapPin>,
      title: "Location Sharing",
    },
    {
      key: 4,
      icon: <CircleDashed size={24}></CircleDashed>,
      title: "Status Updates",
    },
  ];
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
          Security
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
          <Lock size={70} color={theme.palette.common.white}></Lock>
        </Stack>
      </Stack>
      <Stack spacing={2} p={2}>
        <Typography variant="subtitle2" fontWeight={"700"} fontSize={16}>
          Your Chats and calls are private
        </Typography>
        <Typography
          variant="caption"
          fontSize={12}
          color={theme.palette.grey[600]}
        >
          End-to-end encryption keeps your personal messages & call between you
          and person you choose to communicate with. Not even talk can read or
          listen to them. This includes your
        </Typography>
      </Stack>
      <Stack spacing={2} p={2}>
        {List.map(({ icon, key, title }) => (
          <Stack
            key={key}
            alignItems={"center"}
            direction={"row"}
            spacing={2}
            sx={{
              paddingBottom: "5px",
            }}
          >
            {icon}
            <Typography
              variant="caption"
              fontSize={12}
              color={theme.palette.grey[600]}
            >
              {title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default SecurityPanel;
