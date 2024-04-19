import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
const initialState = {
  sideBar: {
    type: "CONTACT",
  },
  isLogin: true,
  settings: {
    open: true,
    type: "SETTING",
  },
  searchTextBox: {
    open: false,
    type: "TEXTBOXSEARCH",
  },
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
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async () => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function UpdateSettingType(type) {
  return async () => {
    dispatch(
      slice.actions.updateSettingType({
        type,
      })
    );
  };
}

export function ToggleTextBox(type) {
  return async () => {
    dispatch(slice.actions.toggleTextBox());
  };
}
