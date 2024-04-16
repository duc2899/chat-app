import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import ThemeDialog from "../../sections/settings/ThemeDialog";
import ShortcutsDialog from "../../sections/settings/ShortcutsDialog";
import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PaintRoller,
  Image,
  ClipboardText,
  Keyboard,
  Question,
} from "phosphor-react";
import { UpdateSettingType } from "../../redux/slices/app";

const SettingsPanel = () => {
  const [openTheme, setOpenTheme] = React.useState(false);
  const [openShortcuts, setOpenShortcuts] = React.useState(false);

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };
  const LIST_MENU = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onClick: () => {
        UpdateSettingType("NOTIFICATION")();
      },
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onClick: () => {
        UpdateSettingType("PRIVACY")();
      },
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onClick: () => {
        UpdateSettingType("SECURITY")();
      },
    },
    {
      key: 3,
      icon: <PaintRoller size={20} />,
      title: "Theme",
      onClick: () => handleOpenTheme(),
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onClick: () => {},
    },
    {
      key: 5,
      icon: <ClipboardText size={20} />,
      title: "Request Account Info",
      onClick: () => {
        UpdateSettingType("REQUESTACC")();
      },
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard shortcuts",
      onClick: () => handleOpenShortcuts(),
    },
    {
      key: 7,
      icon: <Question size={20} />,
      title: "Help",
      onClick: () => {
        UpdateSettingType("HELP")();
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
        >
          <CaretLeft weight="bold" size={28}></CaretLeft>
        </IconButton>
        <Typography
          variant="subtitle2"
          fontSize={23}
          sx={{
            fontWeight: "bold",
          }}
        >
          Settings
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={3}
        sx={{
          width: "100%",
          paddingBottom: "30px",
          paddingTop: "30px",
        }}
      >
        <Avatar
          src={faker.image.avatar()}
          sx={{
            width: 60,
            height: 60,
          }}
        ></Avatar>
        <Stack>
          <Typography variant="subtitle2">Shreyansh shah</Typography>
          <Typography variant="caption">Exploring</Typography>
        </Stack>
      </Stack>
      <Stack p={2} spacing={2}>
        {LIST_MENU.map(({ key, icon, title, onClick }) => (
          <Stack
            key={key}
            sx={{
              cursor: "pointer",
            }}
            onClick={onClick}
            spacing={2}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              {icon}
              <Typography variant="body2">{title}</Typography>
            </Stack>
            {key !== 7 && <Divider />}
          </Stack>
        ))}
      </Stack>
      <ThemeDialog
        open={openTheme}
        handleClose={handleCloseTheme}
      ></ThemeDialog>
      <ShortcutsDialog
        open={openShortcuts}
        handleClose={handleCloseShortcuts}
      ></ShortcutsDialog>
    </Box>
  );
};

export default SettingsPanel;
