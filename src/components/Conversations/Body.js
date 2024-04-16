import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { DocMessage, LinkMessage, MediaMessage, ReplyMessage, TextMessage, TimeLine } from "./MessageTypes";


const Body = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, i) => {
          switch (el.type) {
            case "divider":
              return (
                <TimeLine el={el} key={i}></TimeLine>
              )
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMessage el={el}></MediaMessage>
                case "doc":
                  return <DocMessage el={el}></DocMessage>
                case "link":
                  return (<LinkMessage el={el}></LinkMessage>)
                case "reply":
                  return (<ReplyMessage el={el}></ReplyMessage>)
                default:
                  return <TextMessage el={el}></TextMessage>
                  // Text msg
              }

            default:
              <></>
          }
        })}
      </Stack>
    </Box>
  );
};

export default Body;
