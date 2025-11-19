import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TUser = {
  id: "",
  username: "",
  email: "",
  emailVerified: false,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  profilePicture: "",
  roles: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<TUser>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.profilePicture = action.payload.profilePicture;
      state.roles = action.payload.roles;
    },
    setUserFromKeycloak: (
      state,
      action: PayloadAction<{
        email?: string;
        firstName?: string;
        lastName?: string;
        preferred_username?: string;
        given_name?: string;
        family_name?: string;
        picture?: string;
      }>
    ) => {
      const keycloakUser = action.payload;
      if (keycloakUser.email) state.email = keycloakUser.email;
      if (keycloakUser.firstName) state.firstName = keycloakUser.firstName;
      if (keycloakUser.lastName) state.lastName = keycloakUser.lastName;
      if (keycloakUser.given_name) state.firstName = keycloakUser.given_name;
      if (keycloakUser.family_name) state.lastName = keycloakUser.family_name;
      if (keycloakUser.preferred_username && !state.email) {
        state.email = keycloakUser.preferred_username;
      }
      if (keycloakUser.picture) state.profilePicture = keycloakUser.picture;
    },
    clearUserState: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.emailVerified = false;
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.profilePicture = "";
      state.roles = [];
    }
  }
});

export const { setUserState, setUserFromKeycloak, clearUserState } =
  userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
