import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, ShowSnakeBar } from "../../redux/slices/app";
import {
  AddDirectConversation,
  AddDirectMessage,
  UpdateCurrentMessages,
  UpdateDirectConversation,
} from "../../redux/slices/conversations";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      if (!socket) {
        connectSocket(userId);
      }

      // socket.on("audio_call_notification", (data) => {
      //   // TODO => dispatch an action to add this in call_queue
      //   dispatch(PushToAudioCallQueue(data));
      // });

      // socket.on("video_call_notification", (data) => {
      //   // TODO => dispatch an action to add this in call_queue
      //   dispatch(PushToVideoCallQueue(data));
      // });

      socket.on("new_message", (data) => {
        const message = data.message;

        // check if msg we got is from currently selected conversation

        dispatch(
          AddDirectMessage({
            id: message._id,
            idConversation: data.conversation_id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            incoming: message.to === userId,
            outgoing: message.from === userId,
            from: message.from,
            to: message.to,
            createdAt: message.createdAt,
            status: message.status,
          })
        );
      });

      socket.on("start_chat", (data) => {
        console.log(data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });

      socket.on("new_friend_request", (data) => {
        dispatch(
          ShowSnakeBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("request_accepted", (data) => {
        dispatch(
          ShowSnakeBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(ShowSnakeBar({ severity: "success", message: data.message }));
      });

      socket.on("request_refuse", (data) => {
        dispatch(ShowSnakeBar({ severity: "success", message: data.message }));
      });

      socket.on("deleted_message", (data) => {
        dispatch(UpdateCurrentMessages(data.data));
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      socket?.off("audio_call_notification");
      socket?.off("request_refuse");
      socket?.off("deleted_message");
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction={"row"}>
      <SideBar></SideBar>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
