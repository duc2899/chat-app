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
import React from "react";

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

const ChatInput = ({ setOpenPickerEmoji }) => {
  const [openActions, setOpenActions] = React.useState(false);
  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack width={"max-content"}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none"
              }}
            >
              {actions.map((action) => (
                <Tooltip key={action.y} title={action.title} arrow={true} placement="right">
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
              <IconButton onClick={() => {
                setOpenActions(prev => !prev)
              }}>
                <Link size={32}></Link>
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPickerEmoji((prev) => !prev);
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

const Footer = () => {
  const theme = useTheme();
  const [openPickerEmoji, setOpenPickerEmoji] = React.useState(false);
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
              display: openPickerEmoji ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 80,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={console.log}
            />
          </Box>
          <ChatInput setOpenPickerEmoji={setOpenPickerEmoji} />
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
          <IconButton>
            <PaperPlaneTilt color="#fff"></PaperPlaneTilt>
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
