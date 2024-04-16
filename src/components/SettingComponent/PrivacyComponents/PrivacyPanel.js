import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Checkbox,
} from "@mui/material";
import { CaretLeft, CaretRight } from "phosphor-react";
import { UpdateSettingType } from "../../../redux/slices/app";

const PrivacyPanel = () => {
  const list = [
    {
      key: 0,
      title: "Last Seen",
      data: "Everyone",
      onClick: () => {
        UpdateSettingType("LASTSEEN")();
      },
    },
    {
      key: 1,
      title: "Profile Photo",
      data: "Everyone",
      onClick: () => {
        UpdateSettingType("PROFILEPHOTO")();
      },
    },
    {
      key: 2,
      title: "About",
      data: "Everyone",
      onClick: () => {
        UpdateSettingType("ABOUT")();
      },
    },
    {
      key: 3,
      title: "Read receipts",
      data: "if turned off, you won’t send or receive read receipts. Read receipts are always sent for group chats.",
      onClick: () => {},
    },
    {
      key: 4,
      title: "Groups",
      data: "Everyone",
      onClick: () => {
        UpdateSettingType("GROUPS")();
      },
    },
    {
      key: 5,
      title: "Blocked contacts",
      data: "9",
      onClick: () => {
        UpdateSettingType("BLOCKCONTACTS")();
      },
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
          component={"Span"}
          variant="subtitle2"
          fontSize={23}
          sx={{
            fontWeight: "bold",
          }}
        >
          Privacy
        </Typography>
      </Stack>
      <Stack p={2} spacing={1}>
        {list.map(({ key, title, data, onClick }) => (
          <Stack key={key}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignContent={"space-between"}
              >
                <Typography component={"Span"} variant="subtitle2">
                  {title}
                </Typography>
                <Typography
                  variant="caption"
                  fontSize={11}
                  color={"rgba(114, 115, 117, 1)"}
                  component={"Span"}
                >
                  {data}
                </Typography>
              </Stack>
              {key === 3 ? (
                <Checkbox></Checkbox>
              ) : (
                <IconButton onClick={onClick}>
                  <CaretRight />
                </IconButton>
              )}
            </Stack>
            {key !== 5 && (
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

export default PrivacyPanel;
