import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import { formatTimeMessage } from "../../utils/formatTime";

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const listConversation = action.payload.conversations.map((el) => {
        const this_user = el.participants.find(
          (e) => e._id.toString() !== action.payload.user_id
        );
        const this_message = el.messages[el.messages.length - 1];
        return {
          id: el._id,
          user_id: this_user?._id,
          img: this_user?.avatar,
          name: `${this_user.firstName + " " + this_user.lastName}`,
          msg: this_message?.text,
          time: formatTimeMessage(this_message?.createdAt),
          unread: 2,
          pinned: false,
          online: this_user?.status === "Online",
          from: this_message?.from,
          to: this_message?.to,
          about: this_user?.about,
        };
      });

      state.direct_chat.conversations = listConversation;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== action.payload.user_id
            );
            const this_message = el.messages[el.messages.length - 1];
            return {
              id: this_conversation._id,
              user_id: user?._id,
              name: `${user.firstName + " " + user.lastName}`,
              online: user?.status === "Online",
              img: user?.avatar,
              msg: this_message?.text,
              time: formatTimeMessage(this_message?.createdAt),
              unread: 2,
              pinned: false,
              about: user?.about,
              from: this_message?.from,
              to: this_message?.to,
            };
          }
        }
      );
    },

    addDirectConversation(state, action) {
      console.log("go 3");
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== action.payload.user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      const this_message =
        this_conversation.messages[this_conversation.messages.length - 1];
      state.direct_chat.conversations.push({
        id: this_conversation._id,
        user_id: user?._id,
        name: `${user.firstName + " " + user.lastName}`,
        online: user?.status === "Online",
        img: user?.avatar,
        msg: this_message?.text,
        time: formatTimeMessage(this_message?.createdAt),
        unread: 2,
        pinned: false,
        about: user?.about,
        from: this_message?.from,
        to: this_message?.to,
      });
    },

    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation =
        action.payload.current_conversation;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === action.payload.user_id,
        outgoing: el.from === action.payload.user_id,
        status: el.status,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },

    updateCurrentMessages(state, action) {
      const { deletedMessage, oldCurrentMessages } = action.payload;

      const newCurrentMessages = oldCurrentMessages.map((el) => {
        if (el.id === deletedMessage._id) {
          return {
            ...el,
            status: deletedMessage.status,
          };
        }
        return el;
      });
      state.direct_chat.current_messages = newCurrentMessages;
    },

    addDirectMessage(state, action) {
      const currentMessage = action.payload.message;

      state.direct_chat.current_messages.push(currentMessage);
      const newConversation = action.payload.conversations.map((el) => {
        if (el.id === currentMessage.idConversation) {
          return {
            ...el,
            from: currentMessage.from,
            msg: currentMessage.message,
            time: formatTimeMessage(currentMessage.createdAt),
          };
        }
        return el;
      });

      state.direct_chat.conversations = newConversation;
    },

    resetState() {
      return initialState;
    },
  },
});
export const FetchDirectConversations = ({ conversations }) => {
  // console.log(conversations);
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchDirectConversations({
        conversations: conversations,
        user_id: getState().auth.userId,
      })
    );
  };
};

export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateDirectConversation({
        conversation: conversation,
        user_id: getState().auth.userId,
      })
    );
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.addDirectConversation({
        conversation: conversation,
        user_id: getState().auth.userId,
      })
    );
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.setCurrentConversation({
        current_conversation: current_conversation,
      })
    );
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchCurrentMessages({
        messages: messages,
        user_id: getState().auth.userId,
      })
    );
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.addDirectMessage({
        message: message,
        conversations: getState().conversation.direct_chat.conversations,
      })
    );
  };
};

export function ResetStateConversation() {
  return (dispatch, getState) => {
    dispatch(slice.actions.resetState());
  };
}

export function UpdateCurrentMessages(message) {
  return (dispatch, getState) => {
    dispatch(
      slice.actions.updateCurrentMessages({
        deletedMessage: message,
        oldCurrentMessages:
          getState().conversation.direct_chat.current_messages,
      })
    );
  };
}

export default slice.reducer;
