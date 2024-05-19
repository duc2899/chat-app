import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

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
        return {
          id: this_user._id,
          img: faker.image.avatar(),
          name: `${this_user.firstName + this_user.lastName}`,
          msg: faker.music.songName(),
          time: "12:02",
          unread: 2,
          pinned: true,
          online: this_user.status === "ONLINE",
        };
      });

      state.direct_chat.conversations = listConversation;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
    },
  },
});
export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchDirectConversations({
        conversations: conversations,
        user_id: getState().auth.userId,
      })
    );
  };
};

export default slice.reducer;
