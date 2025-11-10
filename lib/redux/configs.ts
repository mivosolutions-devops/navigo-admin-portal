import { storage } from "./storage";

export const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};
