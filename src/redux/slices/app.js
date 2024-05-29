import { createSlice } from "@reduxjs/toolkit";
import fetchAxios from "../../utils/axios";
import { GET_FRIENDS, GET_FRIENDS_REQUEST, GET_USERS } from "../../ApiUrl";
import { LogoutOut } from "./auth";
const initialState = {
  sideBar: {
    type: "CONTACT",
  },
  settings: {
    open: true,
    type: "SETTING",
  },
  searchTextBox: {
    open: false,
    type: "TEXTBOXSEARCH",
  },
  snackBar: {
    open: null,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  friendsRequest: [],
  chat_type: null,
  room_id: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSidebarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateSettingType(state, action) {
      state.settings.type = action.payload.type;
    },
    toggleTextBox(state) {
      state.searchTextBox.open = !state.searchTextBox.open;
    },
    openSnakeBar(state, action) {
      state.snackBar.open = true;
      state.snackBar.message = action.payload.message;
      state.snackBar.severity = action.payload.severity;
    },
    closeSnakeBar(state, action) {
      state.snackBar.open = null;
      state.snackBar.message = null;
      state.snackBar.severity = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendsRequest(state, action) {
      state.friendsRequest = action.payload.friendsRequest;
    },
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function UpdateSettingType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSettingType({
        type,
      })
    );
  };
}

export function ToggleTextBox(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleTextBox());
  };
}

export function ShowSnakeBar({ message, severity }) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.openSnakeBar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnakeBar());
    }, 4000);
  };
}

export function HideSnakeBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnakeBar());
  };
}

const handelError = (error, dispatch) => {
  dispatch(
    ShowSnakeBar({
      message: error.response.data.message,
      severity: "error",
    })
  );
  if (error.response.status === 401) {
    dispatch(LogoutOut);
  }
};

export function FetchUsers() {
  return async (dispatch, getState) => {
    fetchAxios
      .post(
        GET_USERS,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.updateUsers({
            users: response.data.data,
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    fetchAxios
      .post(
        GET_FRIENDS,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.updateFriends({
            friends: response.data.data,
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
}

export function FetchFriendsRequest() {
  return async (dispatch, getState) => {
    fetchAxios
      .post(
        GET_FRIENDS_REQUEST,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log("FetchFriendsRequest");

        dispatch(
          slice.actions.updateFriendsRequest({
            friendsRequest: response.data.data,
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
}

export function SelectConversation({ room_id }) {
  return (dispatch, getState) => {
    dispatch(
      slice.actions.selectConversation({
        room_id: room_id,
      })
    );
  };
}
