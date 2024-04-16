import {
  useTheme,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Box, Stack } from "@mui/material";
import {
  X,
  Phone,
  VideoCamera,
  CaretRight,
  Star,
  BellSimple,
  FlagBanner,
  Trash,
} from "phosphor-react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "./AntSwitch";

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Block this contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [blockDialog, setBlockDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const handleCloseBlock = () => {
    setBlockDialog(false);
  };
  const handleCloseDelete = () => {
    setDeleteDialog(false);
  };
  return (
    <Box
      sx={{
        width: 340,
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{
              p: 2,
              height: "100%",
              paddingBottom: 3,
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="subtitle2">Contact info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X></X>
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          spacing={3}
          p={3}
        >
          {/* Avatar and phone number */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Avatar
              src={faker.image.avatar()}
              sx={{
                width: 75,
                height: 75,
              }}
            ></Avatar>
            <Stack>
              <Typography variant="subtitle1">Nguyen Hai Linh</Typography>
              <Typography variant="subtitle1">+91 6265 081 928</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              width: "100%",
            }}
            spacing={5}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton>
                <VideoCamera weight="bold"></VideoCamera>
              </IconButton>
              <Typography variant="subtitle1">Video Call</Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton>
                <Phone weight="bold"></Phone>
              </IconButton>
              <Typography variant="subtitle1">Call</Typography>
            </Stack>
          </Stack>
          <Divider></Divider>
          <Stack>
            <Typography variant="subtitle1">About</Typography>
            <Typography variant="caption">Hi there, I am using </Typography>
          </Stack>
          <Divider></Divider>
          <Stack width={"100%"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Typography variant="subtitle1">Media, links and docs</Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="subtitle1">201</Typography>
                <IconButton
                  onClick={() => {
                    dispatch(UpdateSidebarType("MEDIA"));
                  }}
                >
                  <CaretRight weight="bold" />
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={3}
              sx={{
                marginTop: 3,
              }}
            >
              <Avatar
                src={faker.image.avatar()}
                sx={{
                  width: 75,
                  height: 75,
                }}
                variant="square"
              ></Avatar>
              <Avatar
                src={faker.image.avatar()}
                sx={{
                  width: 75,
                  height: 75,
                }}
                variant="square"
              ></Avatar>
              <Avatar
                src={faker.image.avatar()}
                sx={{
                  width: 75,
                  height: 75,
                }}
                variant="square"
              ></Avatar>
            </Stack>
          </Stack>
          <Divider></Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Star size={20} weight="fill" color="#f7f971" />
              <Typography variant="subtitle1">Starred Messages</Typography>
            </Stack>
            <IconButton>
              <CaretRight weight="bold" />
            </IconButton>
          </Stack>
          <Divider></Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <BellSimple size={20} weight="bold" />
              <Typography variant="subtitle1">Mute Notifications</Typography>
            </Stack>
            <AntSwitch></AntSwitch>
          </Stack>
          <Divider></Divider>
          <Stack>
            <Typography
              fontSize={14}
              sx={{
                marginBottom: 2,
              }}
            >
              1 group in common(s)
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Avatar src={faker.image.avatar()}></Avatar>
              <Stack>
                <Typography variant="subtitle1">Camel’s Gang</Typography>
                <Typography variant="caption">
                  Owl, Parrot, Rabbit , You
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/* Footer */}
        <Box
          p={3}
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack direction={"row"} spacing={3}>
            <Button
              startIcon={<FlagBanner></FlagBanner>}
              fullWidth
              variant="outlined"
              onClick={() => setBlockDialog(true)}
            >
              Block
            </Button>
            <Button  onClick={() => setDeleteDialog(true)} startIcon={<Trash></Trash>} fullWidth variant="outlined">
              Delete
            </Button>
          </Stack>
        </Box>
      </Stack>
      {blockDialog && (
        <BlockDialog
          handleClose={handleCloseBlock}
          open={blockDialog}
        ></BlockDialog>
      )}
      {deleteDialog && (
        <DeleteDialog
          handleClose={handleCloseDelete}
          open={deleteDialog}
        ></DeleteDialog>
      )}
    </Box>
  );
};

export default Contact;
