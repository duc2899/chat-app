import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, ShowSnakeBar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
        window.reload();

        if (!socket) {
          connectSocket(user_id);
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
          const exiting_conversation = conversations.find(
            (el) => el.id === data._id
          );

          // if(exiting_conversation){
          //   dispatch(UpdateDirectConversation({conversations: data}))
          // }else{
          //   dispatch(AddDirectConversation({conversations: data}))
          // }

          // dispatch(SelectConversation({room_id: data._id}))
        });

        return () => {
          socket?.off("new_friend_request");
          socket?.off("request_accepted");
          socket?.off("request_sent");
          socket?.off("start_chat");
        };
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
