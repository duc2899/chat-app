import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Transition from "../../components/Transition";
import { MagnifyingGlass, Phone, VideoCamera, X } from "phosphor-react";
import Search, {
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";

import { useTheme } from "@mui/material/styles";

const CallElement = ({ name, img }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.paper,
        borderRadius: 2,
        height: 80,
        width: "100%",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar src={img} sizes={"48"}></Avatar>
          <Stack>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <IconButton>
            <Phone size={20} color={"rgba(118, 212, 94, 1)"}></Phone>
          </IconButton>
          <IconButton>
            <VideoCamera
              size={20}
              color={"rgba(118, 212, 94, 1)"}
            ></VideoCamera>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
const CreateCallDialog = ({ open, handelclose, data }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      handelClose
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography fontSize={20} variant="subtitle2">
          Start new conversation
        </Typography>
        <IconButton onClick={handelclose}>
          <X></X>
        </IconButton>
      </DialogTitle>
      <Divider
        sx={{
          marginTop: "8px",
        }}
        s
      ></Divider>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6"></MagnifyingGlass>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search...."
            sx={{
              width: "100%",
            }}
          ></StyledInputBase>
        </Search>
        <Stack
          spacing={2}
          sx={{
            mt: 2,
          }}
        >
          {data.map((el) => (
            <CallElement key={el.id} {...el}></CallElement>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCallDialog;
