import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    registered: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setCompanyRegistered: (state, action) => {
      state.registered = action.payload;
    },
  },
});

export const { setLoading, setUser, logoutUser, setCompanyRegistered } =
  authSlice.actions;
export default authSlice.reducer;
