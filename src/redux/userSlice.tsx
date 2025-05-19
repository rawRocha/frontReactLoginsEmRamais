import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// userSlice.ts
type UserState = {
  currentUser: { username: string; extension: string } | null;
  previousUsers: { username: string; extension: string }[]; // Array para histórico
};

const initialState: UserState = {
  currentUser: null,
  previousUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(
      state,
      action: PayloadAction<{ username: string; extension: string }>
    ) {
      // Se já tiver um usuário logado, adiciona ao histórico
      if (state.currentUser) {
        state.previousUsers.unshift(state.currentUser);
      }
      state.currentUser = action.payload;
    },
    logoutUser(state, action: PayloadAction<string>) {
      const usernameToLogout = action.payload;

      if (state.currentUser?.username === usernameToLogout) {
        // Se o usuário que está deslogando for o atual, troca pelo anterior
        state.currentUser = state.previousUsers.shift() || null;
      } else {
        // Se for outro usuário, apenas remove do histórico
        state.previousUsers = state.previousUsers.filter(
          user => user.username !== usernameToLogout
        );
      }
    },
    clearHistory(state) {
      state.previousUsers = [];
    },
  },
});

// Exporta as actions
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
