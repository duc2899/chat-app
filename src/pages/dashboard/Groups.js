import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Search, {
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import StyledBadge from "../../components/StyledBadge";
import CreateGroupsDialog from "../../sections/main/CreateGroupsDialog";

const ChatElement = ({ img, name, msg, time, unread, online }) => {
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
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img}></Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={img}></Avatar>
          )}
          <Stack spacing={0.5}>
            <Typography>{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>

        <Stack alignItems={"center"} spacing={2}>
          <Typography variant="p" fontSize={12}>
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

const Groups = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handelClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: 420,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(248, 250, 255, 1)"
            : theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        p={3}
        spacing={3}
        sx={{
          height: "100vh",
        }}
      >
        <Stack>
          <Typography variant="h4">Groups</Typography>
        </Stack>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6"></MagnifyingGlass>
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search...."></StyledInputBase>
        </Search>
        <Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2" color={theme.palette.primary.main}>
              Create New Group
            </Typography>
            <IconButton onClick={() => setOpen(true)}>
              <Plus color={theme.palette.primary.main} fontSize={20}></Plus>
            </IconButton>
          </Stack>
          <Divider></Divider>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            height: "100%",
          }}
        >
          <SimpleBarStyle
            timeout={500}
            clickOnTrack={false}
            sx={{
              paddingRight: "10px",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2">Pinned</Typography>
              {ChatList.filter((el) => el.pinned).map((el) => (
                <ChatElement key={el.id} {...el}></ChatElement>
              ))}
            </Stack>
            <Stack spacing={1} mt={2}>
              <Typography variant="subtitle2">All Groups</Typography>
              {ChatList.filter((el) => !el.pinned).map((el) => (
                <ChatElement key={el.id} {...el}></ChatElement>
              ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
      <CreateGroupsDialog
        handelClose={handelClose}
        open={open}
      ></CreateGroupsDialog>
    </Box>
  );
};

export default Groups;
