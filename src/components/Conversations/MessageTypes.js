import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  alpha,
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
import { Message_options } from "../../data";
import { socket } from "../../socket";
import ReactPlayer from "react-player/youtube";

const TextMessage = ({ el, idConversation, isShow }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
      <Box
        p={1}
        sx={{
          backgroundColor: (() => {
            if (el.status === "DELETED") {
              return "transparent";
            }
            return el.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main;
          })(),
          border:
            el.status === "DELETED" && `1px solid ${theme.palette.grey[400]}`,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        {(() => {
          switch (el.status) {
            case "NORMAL":
              return (
                <Typography
                  variant="body2"
                  sx={{
                    color: el.incoming ? theme.palette.text : "#fff",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {el.message}
                </Typography>
              );
            case "DELETED":
              return (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text,
                    fontStyle: "italic",
                  }}
                >
                  {el.outgoing
                    ? "You have revoked a message"
                    : "Message has been revoked"}
                </Typography>
              );
            default:
              <></>;
          }
        })()}
      </Box>
      {el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
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
            marginTop: "5px",
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
const LinkMessage = ({ el, isShow, idConversation }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.default, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <a
          href={el.message}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction="column"
              spacing={3}
              alignItems="start"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Stack direction={"column"} spacing={2}>
                <ReactPlayer url={el.message} width={"100%"} height={150} />
              </Stack>
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text.primary : "#fff"}
            >
              <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
            </Typography>
          </Stack>
        </a>
      </Box>
      {el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
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
const StickerMessage = ({ el, isShow, idConversation }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent={el.incoming ? "start" : "end"}
    >
      {!el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
      <Box>
        <img
          src={`https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=${el.message}&size=130&version=1`}
          alt={`sticker-${el.message}`}
          style={{ width: 120, height: 120, cursor: "pointer" }}
        />
      </Box>
      {el.incoming && isShow === el.id && (
        <MessageOptions
          id={el.id}
          idConversation={idConversation}
          outgoing={el.outgoing}
        />
      )}
    </Stack>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
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
const MessageOptions = ({ id, idConversation, outgoing }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl("a");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelChooseOption = (value) => {
    switch (value) {
      case "0":
        break;
      case "1":
        break;
      case "2":
        break;
      case "3":
        socket.emit("delete_message", {
          conversation_id: idConversation,
          messageId: id,
        });
        handleClose();
        break;
      default:
    }
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
        {Message_options.filter(
          (op) => !(outgoing === false && op.title === "Revoke Message")
        ).map((op, i) => (
          <MenuItem
            key={i}
            data-my-value={i}
            onClick={(e) => {
              const { myValue } = e.currentTarget.dataset;
              handelChooseOption(myValue);
            }}
          >
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
  StickerMessage,
};
