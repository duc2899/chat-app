import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowBendUpLeft,
  DotsThreeVertical,
  DownloadSimple,
  Image,
  Smiley,
} from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { Message_options } from "../../data";

const TextMessage = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && <MessageOptions />}
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: el.incoming ? theme.palette.text : "#fff",
          }}
        >
          {el.message}
        </Typography>
      </Box>
      {el.incoming && <MessageOptions />}
    </Stack>
  );
};
const DocMessage = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && <MessageOptions />}
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack
          p={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <Image size={42}></Image>
          <Typography
            sx={{
              paddingRight: "15px",
              paddingLeft: "15px",
            }}
            variant="caption"
          >
            Heelo.png
          </Typography>
          <IconButton>
            <DownloadSimple fontWeight={"600"}></DownloadSimple>
          </IconButton>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: el.incoming ? theme.palette.text : "#fff",
            marginTop: "5px"
          }}
        >
          {el.message}
        </Typography>
      </Box>
      {el.incoming && <MessageOptions />}
    </Stack>
  );
};
const MediaMessage = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && <MessageOptions />}
      <Stack spacing={1}>
        <img
          src={el.img}
          alt={el.message}
          style={{
            borderRadius: "18px",
            maxHeight: "210px",
          }}
        ></img>
        <Box
          p={1.5}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: el.incoming ? theme.palette.text : "#fff",
            }}
          >
            {el.message}
          </Typography>
        </Box>
      </Stack>
      {el.incoming && <MessageOptions />}
    </Stack>
  );
};
const LinkMessage = ({ el, i }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
      key={i}
    >
      {!el.incoming && <MessageOptions />}
      <Stack spacing={1}>
        <Box
          p={1.5}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <img
            src={el.preview}
            alt={el.message}
            style={{
              borderRadius: "18px",
              maxHeight: "210px",
              marginBottom: "5px",
            }}
          ></img>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Creating Chat App</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.primary.main,
              }}
              component={Link}
              to={"https://www.youtube.com"}
            >
              www.youtube.com
            </Typography>
          </Stack>
        </Box>
        <Box
          p={1.5}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: el.incoming ? theme.palette.text : "#fff",
            }}
          >
            {el.message}
          </Typography>
        </Box>
      </Stack>
      {el.incoming && <MessageOptions />}
    </Stack>
  );
};
const ReplyMessage = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && <MessageOptions />}
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Box
          p={1}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.background.default
              : theme.palette.grey[400],
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {el.message}
          </Typography>
        </Box>
        <Typography
          p={1}
          variant="body2"
          sx={{
            color: el.incoming ? theme.palette.text : "#fff",
          }}
        >
          {el.reply}
        </Typography>
      </Box>

      {el.incoming && <MessageOptions />}
    </Stack>
  );
};
const TimeLine = ({ el, key }) => {
  const theme = useTheme();
  return (
    <Stack
      key={key}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%"></Divider>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text,
        }}
      >
        {el.text}
      </Typography>
      <Divider width="46%"></Divider>
    </Stack>
  );
};
const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Reply" arrow>
        <IconButton>
          <ArrowBendUpLeft size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="React to message" arrow>
        <IconButton>
          <Smiley size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="See more" arrow>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <DotsThreeVertical size={20}></DotsThreeVertical>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Message_options.map((op, i) => (
          <MenuItem key={i} onClick={handleClose}>
            {op.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export {
  TimeLine,
  TextMessage,
  MediaMessage,
  LinkMessage,
  ReplyMessage,
  DocMessage,
};
