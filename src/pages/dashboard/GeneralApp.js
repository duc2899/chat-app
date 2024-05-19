import React from "react";
import Chats from "./Chats";
import Conversation from "../../components/Conversations";
import { Box, Stack } from "@mui/material";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import MediaMessage from "../../components/MediaMessage";
import ConversationStart from "../../components/ConversationStart";

const GeneralApp = () => {
  const { sideBar, room_id, chat_type } = useSelector((store) => store.app);

  return (
    <Stack sx={{ width: "100%", overflow: "hidden" }} direction={"row"}>
      <Chats></Chats>
      <Box
        sx={{
          height: "100%",
          width: sideBar.open ? "calc(100vw - 748px)" : "calc(100vw - 420px)",
          backgroundColor: "#fff",
        }}
      >
        {room_id !== null && chat_type === "individual" ? (
          <Conversation></Conversation>
        ) : (
          <ConversationStart></ConversationStart>
        )}
      </Box>
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact></Contact>;
            case "MEDIA":
              return <MediaMessage></MediaMessage>;
            default:
              return <div>Error</div>;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
