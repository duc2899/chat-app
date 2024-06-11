import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import {
  Camera,
  File,
  Image,
  Link,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useRef, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import Stickers from "./Stickers";

const actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24}></Image>,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24}></Sticker>,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0159b2",
    icon: <File size={24}></File>,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24}></User>,
    y: 312 + 70,
    title: "Contact",
  },
];

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingBottom: "14px",
    fontSize: "14px",
  },
}));

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
}) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);
  const handelSendMessage = () => {
    if (value) {
      socket.emit("text_message", {
        message: value,
        conversation_id: room_id,
        from: userId,
        to: current_conversation.user_id,
        type: containsUrl(value) ? "LINK" : "TEXT",
      });
      setValue("");
    }
  };
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" && e.altKey) || (e.key === "Enter" && e.shiftKey)) {
      e.preventDefault();
      const textarea = e.target;
      const currentCursorPosition = textarea.selectionStart;
      const textBeforeCursorPosition = textarea.value.substring(
        0,
        currentCursorPosition
      );
      const textAfterCursorPosition = textarea.value.substring(
        currentCursorPosition
      );

      setTimeout(() => {
        const newText = `${textBeforeCursorPosition}\n${textAfterCursorPosition}`;
        textarea.value = newText;
        e.target.selectionStart = e.target.selectionEnd =
          currentCursorPosition + 1;
        textarea.scrollTop = textarea.scrollHeight;
      }, 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handelSendMessage();
    }
  };

  return (
    <StyledInput
      fullWidth
      multiline
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPicker(!openPicker);
              }}
            >
              <Smiley size={32} />
            </IconButton>
            <IconButton onClick={handelSendMessage}>
              <PaperPlaneTilt
                weight="fill"
                color={theme.palette.primary.main}
              ></PaperPlaneTilt>
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></StyledInput>
  );
};

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [openPicker, setOpenPicker] = React.useState(false);
  const inputRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "sticker-popover" : undefined;

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  const handelActions = (e, value) => {
    if (value === "Stickers") {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <Box
      pr={2}
      pl={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.default,
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"flex-end"}
        justifyContent={"center"}
      >
        {/* chatInput */}
        <Stack width={"100%"}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 80,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiClick(emoji.native);
              }}
            />
          </Box>

          <Stickers
            id={id}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          ></Stickers>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              mb: "5px",
            }}
          >
            {actions.map((action) => (
              <Tooltip
                key={action.y}
                title={action.title}
                arrow={true}
                placement="top"
                onClick={(e) => handelActions(e, action.title)}
              >
                <IconButton>{action.icon}</IconButton>
              </Tooltip>
            ))}
          </Stack>
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
