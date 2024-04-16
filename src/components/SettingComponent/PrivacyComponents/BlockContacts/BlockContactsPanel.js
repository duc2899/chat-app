import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Radio,
  Avatar,
} from "@mui/material";
import { UpdateSettingType } from "../../../../redux/slices/app";
import { CaretLeft, Plus, X } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import BLockContactDialog from "./BLockContactDialog";

const BlockContactsPanel = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton
          sx={{
            color: "currentColor",
          }}
          onClick={() => UpdateSettingType("PRIVACY")()}
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
          Blocked Contacts
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
      >
        <Typography
          variant="subtitle2"
          fontSize={13}
          color={theme.palette.primary.main}
        >
          Block New Contact
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <Plus color={theme.palette.primary.main}></Plus>
        </IconButton>
      </Stack>
      <Divider></Divider>
      <Stack p={2} spacing={3}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Stack
            key={i}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              padding: 2,
            }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Avatar src={faker.image.avatar()} sizes={50}></Avatar>
              <Stack direction={"column"}>
                <Typography variant="subtitle2">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="caption" color={"rgba(124, 124, 125, 1)"}>
                  {faker.word.conjunction()}
                </Typography>
              </Stack>
            </Stack>
            <IconButton>
              <X size={16} weight="bold"></X>
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <BLockContactDialog
        open={open}
        handleClose={handleClose}
      ></BLockContactDialog>
    </Box>
  );
};

export default BlockContactsPanel;
