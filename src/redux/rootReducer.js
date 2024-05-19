import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import conversations from "./slices/conversations";
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversations,
});

export { rootPersistConfig, rootReducer };
