import { configureStore } from "@reduxjs/toolkit";
import todolist from "./todolist";
import UserInfo from "./UserInfo";

const store = configureStore({
  reducer: {
    todolist: todolist.reducer,
    UserInfo,
  },
});
export default store;
