import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [];

let todolist = createSlice({
  name: "item",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      const { title, content, author } = action.payload;
      state.push({
        id: nanoid(),
        title: title,
        content: content,
        author: author,
      });
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    edit: (state, action) => {
      const { id, title, content } = action.payload;
      return state.map((item) =>
        item.id === id
          ? {
              ...item,
              title: title,
              content: content,
            }
          : item
      );
    },
  },
});

export const { add, remove, edit } = todolist.actions;
export default todolist;
