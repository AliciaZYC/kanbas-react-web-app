import { createSlice } from "@reduxjs/toolkit";
// modified for 3.4.4
const initialState = {
  currentUser: {
    username: "",
    role: "",
  },
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
