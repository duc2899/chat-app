import { createSlice } from "@reduxjs/toolkit";

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
