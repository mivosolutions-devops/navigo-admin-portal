"use client";
import { type FC, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider: FC<TLayoutProps> = ({ children }) => {
  const storeRef: any = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
