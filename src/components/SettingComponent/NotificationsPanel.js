import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Checkbox,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { UpdateSettingType } from "../../redux/slices/app";
const NotificationsPanel = () => {
  const list = [
    {
      key: 0,
      title: "Notifications",
      description: "Show notifications for new messages",
    },
    {
      key: 1,
      title: "Show Previews",
      description: "",
    },
    {
      key: 2,
      title: "Show Reaction Notifications",
      description: "",
    },
    {
      key: 3,
      title: "Incoming call ringtone",
      description: "",
    },
    {
      key: 4,
      title: "Sounds",
      description: "Play sounds for incoming messages",
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
          Notifications
        </Typography>
      </Stack>
      <Stack p={2} spacing={1}>
        {list.map(({ key, title, description }) => (
          <Stack key={key}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignContent={"space-between"}
              >
                <Typography variant="subtitle2">{title}</Typography>
                {description && (
                  <Typography
                    variant="caption"
                    fontSize={11}
                    color={"rgba(114, 115, 117, 1)"}
                  >
                    {description}
                  </Typography>
                )}
              </Stack>
              <Checkbox />
            </Stack>
            {key !== 4 && (
              <Divider
                sx={{
                  marginTop: "8px",
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default NotificationsPanel;
