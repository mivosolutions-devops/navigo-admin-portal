import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TRolesState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  format: "table",
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<TRole[]>) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalRoles: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setFormat: (state, action: PayloadAction<TFormat>) => {
      state.format = action.payload;
    },
  },
});

export const {
  setRoles,
  setCurrentPage,
  setTotalPages,
  setTotalRoles,
  setFormat,
} = rolesSlice.actions;

const userReducer = rolesSlice.reducer;
export default userReducer;
