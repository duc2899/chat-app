import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchUsers,
  FetchFriendsRequest,
} from "../../redux/slices/app";
import {
  FriendElement,
  FriendRequestElement,
  UserElement,
} from "../../components/Friends";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  return users.map((el) => <UserElement key={el._id} {...el}></UserElement>);
};

const FriendsList = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  return friends.map((el) => (
    <FriendElement key={el._id} {...el}></FriendElement>
  ));
};

const FriendsRequestList = () => {
  const dispatch = useDispatch();

  const { friendsRequest } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendsRequest());
  }, []);

  return friendsRequest.map((el, i) => (
    <FriendRequestElement
      key={i}
      {...el.sender}
      id={el._id}
    ></FriendRequestElement>
  ));
};
const FriendsDialog = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered
        >
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Request" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0:
                  return <UsersList></UsersList>;
                case 1:
                  return <FriendsList></FriendsList>;
                case 2:
                  return <FriendsRequestList></FriendsRequestList>;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FriendsDialog;
