import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedslice";
import connectionReducer from "./connectionslice";
import requestReducer from "./requestslice";

const appstore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appstore;
