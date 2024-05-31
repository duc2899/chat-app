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
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

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
    color: "#0172e4",
    icon: <Camera size={24}></Camera>,
    y: 242,
    title: "Image",
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
    paddingTop: "14px",
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
  onSubmit,
}) => {
  const [openActions, setOpenActions] = React.useState(false);

  return (
    <StyledInput
      fullWidth
      onKeyPress={(e) => {
        if (e.which === 13) {
          onSubmit();
        }
      }}
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack width={"max-content"}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {actions.map((action) => (
                <Tooltip
                  key={action.y}
                  title={action.title}
                  arrow={true}
                  placement="right"
                >
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -action.y,
                      backgroundColor: action.color,
                    }}
                  >
                    {action.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}
              >
                <Link size={32}></Link>
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPicker(!openPicker);
              }}
            >
              <Smiley size={32} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></StyledInput>
  );
};

function linkVerify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const { userId } = useSelector((state) => state.auth);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);

  const theme = useTheme();
  const [value, setValue] = useState("");
  const [openPicker, setOpenPicker] = React.useState(false);
  const inputRef = useRef(null);

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

  const handelSendMessage = () => {
    if (value) {
      socket.emit("text_message", {
        message: linkVerify(value),
        conversation_id: room_id,
        from: userId,
        to: current_conversation.user_id,
        type: containsUrl(value) ? "LINK" : "TEXT",
      });
      setValue("");
    }
  };

  return (
    <Box
      p={2}
      sx={{
        width: "100%",

        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.default,
      }}
    >
      <Stack direction={"row"} spacing={2}>
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
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
            onSubmit={handelSendMessage}
          />
        </Stack>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: 48,
            width: 48,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handelSendMessage}>
            <PaperPlaneTilt color="#fff"></PaperPlaneTilt>
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
