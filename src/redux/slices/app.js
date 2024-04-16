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
