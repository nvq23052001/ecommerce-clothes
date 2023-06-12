import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    name: null,
    avatar: null,
    accessToken: '',
    phone: '',
    id: null,
    addresses: []
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth(state, { payload }) {
      state.user = { ...payload };
    },
    signOut(state) {
      state.user = { ...initialState.user };
    }
  }
});

export const { updateAuth, signOut } = authSlice.actions;
export default authSlice.reducer;
