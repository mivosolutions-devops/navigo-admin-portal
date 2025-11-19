import Keycloak from "keycloak-js";

// Keycloak configuration
const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
};

// Initialize Keycloak instance (only on client side)
let keycloak: Keycloak | null = null;
let isInitializing = false;
let isInitialized = false;

if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig);
}

export const getKeycloak = () => keycloak;
export const getIsInitializing = () => isInitializing;
export const getIsInitialized = () => isInitialized;
export const setIsInitializing = (value: boolean) => {
  isInitializing = value;
};
export const setIsInitialized = (value: boolean) => {
  isInitialized = value;
};

export default keycloak as Keycloak;

