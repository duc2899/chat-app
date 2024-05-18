import { createSlice } from "@reduxjs/toolkit";
import fetchAxios from "../../utils/axios";
import {
  FORGOT_PASSWORD,
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD,
  VERIFY_OTP,
  SEND_OTP,
  GET_ME,
  UPDATE_ME,
} from "../../ApiUrl";
import { ShowSnakeBar } from "./app";
const initialState = {
  user: {},
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  timeExpired: 0,
  userId: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
    updateTimeExpired(state, action) {
      state.timeExpired = action.payload.timeExpired;
    },
    updateUserId(state, action) {
      state.userId = action.payload.userId;
    },
    toggleLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export default slice.reducer;

const handelError = (error, dispatch) => {
  dispatch(
    ShowSnakeBar({
      message: error.response.data.message,
      severity: "error",
    })
  );
  if (error.response.status === 401) {
    dispatch(
      slice.actions.signOut({
        isLoggedIn: false,
        token: "",
        user: {},
      })
    );
  }
};

export function LoginUser(formValue) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.toggleLoading({
        isLoading: true,
      })
    );
    await fetchAxios
      .post(
        LOGIN_USER,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: res.data.data.token,
          })
        );
        dispatch(
          ShowSnakeBar({
            message: res.data.message,
            severity: "success",
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      })
      .finally(() => {
        dispatch(
          slice.actions.toggleLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function LogoutOut() {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.signOut({
        isLoggedIn: false,
        token: "",
        user: {},
      })
    );
    dispatch(
      ShowSnakeBar({
        message: "Logout Success",
        severity: "success",
      })
    );
  };
}

export function ForgotPassword(formValue) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.toggleLoading({
        isLoading: true,
      })
    );
    await fetchAxios
      .post(
        FORGOT_PASSWORD,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(
          ShowSnakeBar({
            message: res.data.message,
            severity: "success",
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      })
      .finally(() => {
        dispatch(
          slice.actions.toggleLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function ResetPassword(formValue) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.toggleLoading({
        isLoading: true,
      })
    );
    await fetchAxios
      .post(
        RESET_PASSWORD,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            ShowSnakeBar({
              message: res.data.message,
              severity: "success",
            })
          );
          window.location.href = "/auth/login";
        }
      })
      .catch((error) => {
        handelError(error, dispatch);
      })
      .finally(() => {
        dispatch(
          slice.actions.toggleLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function VerifyOTP(formValue) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.toggleLoading({
        isLoading: true,
      })
    );
    await fetchAxios
      .post(
        VERIFY_OTP,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: res.data.data.token,
            })
          );
          dispatch(
            ShowSnakeBar({
              message: res.data.message,
              severity: "success",
            })
          );
        }
      })
      .catch((error) => {
        handelError(error, dispatch);
      })
      .finally(() => {
        dispatch(
          slice.actions.toggleLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function ResendOTP(formValue) {
  return async (dispatch, getValue) => {
    await fetchAxios
      .post(
        SEND_OTP,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resOTP) => {
        if (resOTP.status === 200) {
          dispatch(
            slice.actions.updateTimeExpired({
              timeExpired: resOTP.data.timeExpired,
            })
          );
          dispatch(
            ShowSnakeBar({
              message: "Re-send OTP successfully",
              severity: "success",
            })
          );
        }
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
}

export function RegisterUser(formValue) {
  return async (dispatch, getValue) => {
    dispatch(
      slice.actions.toggleLoading({
        isLoading: true,
      })
    );
    await fetchAxios
      .post(
        REGISTER_USER,
        {
          ...formValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.status === 200) {
          dispatch(
            slice.actions.updateRegisterEmail({
              email: formValue.email,
            })
          );
          dispatch(
            slice.actions.updateUserId({
              userId: res.data.userId,
            })
          );
          await fetchAxios
            .post(
              SEND_OTP,
              {
                userId: res.data.userId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((resOTP) => {
              if (resOTP.status === 200) {
                dispatch(
                  slice.actions.updateTimeExpired({
                    timeExpired: resOTP.data.timeExpired,
                  })
                );
                window.location.href = "/auth/verify";
              }
              dispatch(
                ShowSnakeBar({
                  message: res.data.message,
                  severity: "success",
                })
              );
            })
            .catch((error) => {
              handelError(error, dispatch);
            });
        }
      })
      .catch((error) => {
        handelError(error, dispatch);
      })
      .finally(() => {
        dispatch(
          slice.actions.toggleLoading({
            isLoading: false,
          })
        );
      });
  };
}

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    fetchAxios
      .get(GET_ME, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
};

export const UpdateUserProfile = (formValues) => {
  return async (dispatch, getState) => {
    fetchAxios
      .post(
        UPDATE_ME,
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
        dispatch(
          ShowSnakeBar({
            message: response.data.message,
            severity: "success",
          })
        );
      })
      .catch((error) => {
        handelError(error, dispatch);
      });
  };
};
