import { combineReducers } from "redux";
import userReducer from "./features/user/userSlice";
import usersReducer from "./features/users/usersSlice";
import rolesReducer from "./features/roles/rolesSlice";
import permissionsReducer from "./features/permissions/permissionsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
});

export default rootReducer;
