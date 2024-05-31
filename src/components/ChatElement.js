import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

const ChatElement = ({
  img,
  name,
  msg,
  time,
  unread,
  online,
  id,
  from,
  to,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);

  let isSelected = room_id === id;

  if (!room_id) {
    isSelected = false;
  }

  return (
    <Box
      sx={{
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.2)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
        borderRadius: 2,
        height: 80,
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => dispatch(SelectConversation({ room_id: id }))}
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

            <Typography
              variant="caption"
              sx={{
                color: "#9d9d9d",
              }}
            >
              {from === userId && " You:"} {msg}
            </Typography>
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

export default ChatElement;
