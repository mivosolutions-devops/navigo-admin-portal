import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TUsersState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  inViewUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<TUserData[]>) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalUsers: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setInViewUser: (state, action: PayloadAction<TUserData>) => {
      state.inViewUser = action.payload;
    },
    updateInViewUserRoles: (state, action: PayloadAction<TRole>) => {
      if (state.inViewUser) {
        const updatedRoles = state.inViewUser?.roles?.map((role) =>
          role.id == action.payload.id ? action.payload : role,
        );
        state.inViewUser.roles = updatedRoles;
      }
    },
  },
});

export const {
  setUsers,
  setCurrentPage,
  setTotalPages,
  setTotalUsers,
  setInViewUser,
  updateInViewUserRoles,
} = usersSlice.actions;

const userReducer = usersSlice.reducer;
export default userReducer;
