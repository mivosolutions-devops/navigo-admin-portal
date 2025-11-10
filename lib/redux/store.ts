import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { rootPersistConfig } from "./configs";

export const makeStore = () => {
  const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
