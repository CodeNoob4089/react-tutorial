import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "리액트 복습하기",
    content: "리액트 내용 복습하기",
    author: "작성자",
  },
  {
    id: nanoid(),
    title: "리덕스툴킷 복습하기",
    content: "리덕스툴킷 내용 복습하기",
    author: "작성자",
  },
  {
    id: nanoid(),
    title: "타입스크립트 공부하기",
    content: "타입스크립트 공부하기",
    author: "작성자",
  },
];

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
