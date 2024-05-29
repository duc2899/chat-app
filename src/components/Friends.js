import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Chat } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import {
  FetchFriendsRequest,
  FetchUsers,
  ShowSnakeBar,
} from "../redux/slices/app";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

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

const UserElement = ({ img, firstName, lastName, status, _id, check }) => {
  const { userId } = useSelector((store) => store.auth);
  const theme = useTheme();
  const dispatch = useDispatch();
  const name = `${firstName} ${lastName}`;

  const handelSendRequest = () => {
    if (socket && socket.connected) {
      socket.emit("friend_request", { to: _id, from: userId }, (res) => {
        dispatch(FetchUsers());
      });
    } else {
      console.error("Socket is not connected");
    }
  };

  const handelRefuseRequest = () => {
    if (socket && socket.connected) {
      socket.emit("refuse_friend_request", { to: _id, from: userId }, (res) => {
        dispatch(FetchUsers());
      });
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        {check === "sent" ? (
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button onClick={handelRefuseRequest} color="error">
              Cancel Request
            </Button>
          </Stack>
        ) : (
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button onClick={handelSendRequest}>Send Request</Button>
          </Stack>
        )}
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestElement = ({ sender, _id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const name = `${sender.firstName} ${sender.lastName}`;
  const handelAcceptRequest = () => {
    socket.emit(
      "handel_request",
      { request_id: _id, isAccept: true },
      (res) => {
        if (!res.success) {
          dispatch(ShowSnakeBar({ message: res.message, severity: "error" }));
        }
        dispatch(FetchFriendsRequest());
      }
    );
  };
  const handelRefuseRequest = () => {
    socket.emit(
      "handel_request",
      { request_id: _id, isAccept: false },
      (res) => {
        if (!res.success) {
          dispatch(ShowSnakeBar({ message: res.message, severity: "error" }));
        }
        dispatch(FetchFriendsRequest());
      }
    );
  };

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-around"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {sender.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={sender.avatar} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={sender.avatar} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button onClick={handelAcceptRequest}>Accept</Button>
          <Button color="error" onClick={handelRefuseRequest}>
            Refuse
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendElement = ({
  img,
  firstName,
  lastName,
  incoming,
  missed,
  status,
  _id,
}) => {
  const theme = useTheme();
  const { userId } = useSelector((store) => store.auth);
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              // start a new conversation
              socket.emit("start_conversation", { to: _id, from: userId });
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserElement, FriendRequestElement, FriendElement };
