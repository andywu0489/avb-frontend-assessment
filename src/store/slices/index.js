import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import commentsReducer from "./comments";
import paginationReducer from "./pagination";

const rootReducer = combineReducers({
  [viewName]: viewReducer,
  comments: commentsReducer,
  pagination: paginationReducer,
});

export default rootReducer;
