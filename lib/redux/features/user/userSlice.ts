import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TUser = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roles: [],
  permissions: [],
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<TUser>) => {
      state.email = action.payload.email;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.roles = action.payload.roles;
      state.phoneNumber = action.payload.phoneNumber;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setUserState } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
