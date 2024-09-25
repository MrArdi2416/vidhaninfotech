import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
const token = localStorage.getItem("authToken");

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

 
const initialState: AuthState = {
  isAuthenticated: !!token,
  token: token ? token : null,
  error: null,
};
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.error = null;
      localStorage.setItem("authToken", action.payload);

    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem("authToken");
    },
  },
});
 
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
 
export default authSlice.reducer;