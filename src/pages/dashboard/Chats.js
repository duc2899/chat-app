import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  UsersThree,
} from "phosphor-react";
import React, { useEffect } from "react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import Search, {
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import FriendsDialog from "../../sections/main/FriendsDialog";
import ChatElement from "../../components/ChatElement";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversations";

const Chats = () => {
  const { userId } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const theme = useTheme();
  const [dialog, setDialog] = React.useState(false);
  const handelClose = () => {
    setDialog(false);
  };
  const handelOpen = () => {
    setDialog(true);
  };
  useEffect(() => {
    if (socket) {
      socket.emit("get_direct_conversation", { user_id: userId }, (data) => {
        console.log(data);
        if (data.success) {
          dispatch(FetchDirectConversations({ conversations: data.data }));
        }
      });
    }
  }, []);
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
        <Stack
          alignItems={"center"}
          justifyContent="space-between"
          direction={"row"}
        >
          <Typography variant="h4" border={""}>
            Chats
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <CircleDashed></CircleDashed>
            </IconButton>
            <IconButton onClick={() => handelOpen()}>
              <UsersThree />
            </IconButton>
          </Stack>
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
          <SimpleBarStyle
            timeout={500}
            clickOnTrack={false}
            sx={{
              paddingRight: "10px",
            }}
          >
            {conversations.filter((el) => el.pinned).length !== 0 && (
              <Stack
                spacing={1}
                sx={{
                  mb: 1,
                }}
              >
                <Typography variant="subtitle2">Pinned</Typography>
                {conversations
                  .filter((el) => el.pinned)
                  .map((el) => (
                    <ChatElement key={el.id} {...el}></ChatElement>
                  ))}
              </Stack>
            )}
            <Stack spacing={1}>
              <Typography variant="subtitle2">All Chats</Typography>
              {conversations
                .filter((el) => !el.pinned)
                .map((el) => (
                  <ChatElement key={el.id} {...el}></ChatElement>
                ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
      {dialog && (
        <FriendsDialog open={dialog} handleClose={handelClose}></FriendsDialog>
      )}
    </Box>
  );
};

export default Chats;
