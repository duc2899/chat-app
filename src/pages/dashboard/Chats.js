import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { styled } from "@mui/material/styles";
import Search, {
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
const ChatElement = ({ id, img, name, msg, time, unread, online }) => {
  const theme = useTheme();
  return (
    <Box
      key={id}
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
            <Typography variant="subtitle2">{name}</Typography>
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
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Chats = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
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
        <Stack
          alignItems={"center"}
          justifyContent="space-between"
          direction={"row"}
        >
          <Typography variant="h4" border={""}>
            Chats
          </Typography>
          <IconButton>
            <CircleDashed></CircleDashed>
          </IconButton>
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
            justifyContent={"flex-start"}
          >
            <ArchiveBox></ArchiveBox>
            <Button>Archived</Button>
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
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Pinned</Typography>
              {ChatList.filter((el) => el.pinned).map((el) => (
                <ChatElement {...el}></ChatElement>
              ))}
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2">All Chats</Typography>
              {ChatList.filter((el) => !el.pinned).map((el) => (
                <ChatElement {...el}></ChatElement>
              ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
