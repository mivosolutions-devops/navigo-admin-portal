import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TPermissionsState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<TPermission[]>) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalPermissions: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const {
  setPermissions,
  setCurrentPage,
  setTotalPages,
  setTotalPermissions,
} = permissionsSlice.actions;

const userReducer = permissionsSlice.reducer;
export default userReducer;
