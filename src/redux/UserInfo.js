import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const UserInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      return action.payload;
    },
    resetUserInfo: (state) => {
      return initialState;
    },
  },
});

export const { getUserInfo, resetUserInfo } = UserInfo.actions;

export default UserInfo.reducer;
