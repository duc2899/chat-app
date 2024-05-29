import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { ShowSnakeBar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isLoggedIn) {
      const onLoadHandler = () => {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }

        if (!socket) {
          connectSocket(userId);
        }

        socket.on("new_friend_request", (data) => {
          dispatch(
            ShowSnakeBar({
              message: data.message,
              severity: "success",
            })
          );
        });

        socket.on("request_accepted", (data) => {
          dispatch(
            ShowSnakeBar({
              message: data.message,
              severity: "success",
            })
          );
        });

        socket.on("request_refuse", (data) => {
          dispatch(
            ShowSnakeBar({
              message: data.message,
              severity: "success",
            })
          );
        });
        socket.on("request_sent", (data) => {
          dispatch(
            ShowSnakeBar({
              message: data.message,
              severity: "success",
            })
          );
        });

        socket.on("start_chat", (data) => {
          console.log(data);
          const existing_conversation = conversations.find(
            (el) => el.id === data._id
          );

          // Uncomment and adjust the following based on your needs
          // if(existing_conversation){
          //   dispatch(UpdateDirectConversation({conversations: data}))
          // }else{
          //   dispatch(AddDirectConversation({conversations: data}))
          // }

          // dispatch(SelectConversation({room_id: data._id}))
        });
      };

      window.onload = onLoadHandler;

      return () => {
        if (socket) {
          socket.off("new_friend_request");
          socket.off("request_accepted");
          socket.off("request_sent");
          socket.off("start_chat");
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoggedIn, socket]);

  useEffect(() => {
    if (isLoggedIn && !socket) {
      connectSocket(userId);
    }
  }, [isLoggedIn, userId]);

  // Ensure socket is connected once the user logs in
  useEffect(() => {
    if (isLoggedIn && socket) {
      socket.on("connect", () => {
        console.log("Socket connected");
      });

      return () => {
        if (socket) {
          socket.off("connect");
        }
      };
    }
  }, [isLoggedIn]);

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
