import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  username: string;
  extension: string;
};

const initialState: UserState = {
  username: '',
  extension: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: PayloadAction<{ username: string; extension: string }>
    ) {
      state.username = action.payload.username;
      state.extension = action.payload.extension;
    },
    clearUserInfo(state) {
      state.username = '';
      state.extension = '';
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
