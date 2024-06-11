import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  DocMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  StickerMessage,
  TextMessage,
  TimeLine,
} from "./MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversations";

const Body = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const divRef = useRef(null);
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { room_id } = useSelector((state) => state.app);

  const [showOption, setShowOption] = useState("");

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);
    socket.emit("get_message", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      dispatch(FetchCurrentMessages({ messages: data.data }));
    });

    dispatch(SetCurrentConversation(current));
  }, [room_id, conversations, dispatch]);

  useEffect(() => {
    // Cuộn xuống cuối khi tin nhắn thay đổi
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [current_messages]);

  const handleMouseOver = (e) => {
    const datasetValue = e.currentTarget.dataset.id;
    setShowOption(datasetValue); // In ra giá trị của dataset khi hover
  };

  return (
    <Box
      p={3}
      width={"100%"}
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
      }}
      ref={chatContainerRef}
    >
      <Stack ref={divRef} data-id="123" spacing={1.5}>
        {current_messages.map((el, i) => {
          let messageComponent;
          switch (el.type) {
            case "divider":
              messageComponent = <TimeLine el={el} key={i} />;
              break;
            case "msg":
              switch (el.subtype) {
                case "IMG":
                  messageComponent = <MediaMessage key={i} el={el} />;
                  break;
                case "DOC":
                  messageComponent = <DocMessage key={i} el={el} />;
                  break;
                case "LINK":
                  messageComponent = (
                    <LinkMessage
                      key={i}
                      el={el}
                      idConversation={room_id}
                      isShow={showOption}
                    />
                  );
                  break;
                case "REPLY":
                  messageComponent = <ReplyMessage key={i} el={el} />;
                  break;
                case "STICKER":
                  messageComponent = (
                    <StickerMessage
                      key={i}
                      el={el}
                      idConversation={room_id}
                      isShow={showOption}
                    ></StickerMessage>
                  );
                  break;
                default:
                  messageComponent = (
                    <TextMessage
                      key={i}
                      el={el}
                      idConversation={room_id}
                      isShow={showOption}
                    />
                  );
              }
              break;
            default:
              messageComponent = null;
          }

          return (
            <div
              key={i}
              data-id={el.id}
              onMouseOver={handleMouseOver}
              onMouseLeave={() => {
                setShowOption("");
              }}
            >
              {messageComponent}
            </div>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Body;
