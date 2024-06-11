import StyledBadge from "../StyledBadge";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";

import React from "react";

import {
  ToggleSidebar,
  UpdateSidebarType,
  ToggleTextBox,
} from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { userActivityTime } from "../../utils/formatTime";

const Headers = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.default,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
      >
        <Stack
          sx={{
            cursor: "pointer",
          }}
          direction={"row"}
          spacing={1.5}
          alignItems={"center"}
          onClick={() => {
            dispatch(ToggleSidebar());
            dispatch(UpdateSidebarType("CONTACT"));
          }}
        >
          {current_conversation?.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={current_conversation?.name}
                src={current_conversation?.img}
              />
            </StyledBadge>
          ) : (
            <Avatar
              alt={current_conversation?.name}
              src={current_conversation?.img}
            />
          )}
          <Stack spacing={0.5}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
              }}
            >
              {current_conversation?.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: "#696969",
              }}
            >
              {current_conversation?.online
                ? "Online"
                : userActivityTime(current_conversation?.lastActiveAt)}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} spacing={3}>
            <IconButton>
              <VideoCamera size={24} />
            </IconButton>
            <IconButton>
              <Phone size={24} />
            </IconButton>
            <IconButton onClick={() => dispatch(ToggleTextBox())}>
              <MagnifyingGlass size={24} />
            </IconButton>
            <Divider orientation="vertical" flexItem></Divider>
            <IconButton>
              <CaretDown size={24} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Headers;
