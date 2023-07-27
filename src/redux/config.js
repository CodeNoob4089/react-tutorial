import { configureStore } from "@reduxjs/toolkit";
import todolist from "./todolist";

const store = configureStore({
  reducer: {
    todolist: todolist.reducer,
  },
});
export default store;
