"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

export const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

export const storage =
  typeof window !== undefined ? createWebStorage("local") : createNoopStorage();
