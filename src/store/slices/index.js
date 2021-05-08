import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  [viewName]: viewReducer,
  comments: commentsReducer,
});

export default rootReducer;
