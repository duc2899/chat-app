import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Chat_History } from "../../data";
import {
  DocMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
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
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);
    socket.emit("get_message", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      dispatch(FetchCurrentMessages({ messages: data.data }));
    });

    dispatch(SetCurrentConversation(current));
  }, []);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {current_messages.map((el, i) => {
          switch (el.type) {
            case "divider":
              return <TimeLine el={el} key={i}></TimeLine>;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMessage key={i} el={el}></MediaMessage>;
                case "doc":
                  return <DocMessage key={i} el={el}></DocMessage>;
                case "link":
                  return <LinkMessage key={i} el={el}></LinkMessage>;
                case "reply":
                  return <ReplyMessage key={i} el={el}></ReplyMessage>;
                default:
                  return (
                    <TextMessage
                      key={i}
                      el={el}
                      idConversation={room_id}
                    ></TextMessage>
                  );
                // Text msg
              }

            default:
              <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Body;
