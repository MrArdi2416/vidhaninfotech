import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface UserState {
  isRegistered: boolean;
  error: string | null;
}
 
const initialState: UserState = {
  isRegistered: false,
  error: null,
};
 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSuccess(state) {
      state.isRegistered = true;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isRegistered = false;
      state.error = action.payload;
    },
  },
});
 
export const { registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;