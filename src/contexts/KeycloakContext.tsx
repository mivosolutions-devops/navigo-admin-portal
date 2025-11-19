"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import keycloak, {
  getIsInitializing,
  getIsInitialized,
  setIsInitializing,
  setIsInitialized
} from "@/lib/keycloak";
import type { KeycloakInstance } from "keycloak-js";

interface KeycloakContextType {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
  loading: boolean;
}

const KeycloakContext = createContext<KeycloakContextType>({
  keycloak: null,
  authenticated: false,
  loading: true
});

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within KeycloakProvider");
  }
  return context;
};

interface KeycloakProviderProps {
  children: React.ReactNode;
}

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({
  children
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keycloak) {
      setLoading(false);
      return;
    }

    // If already initialized, just sync the state
    if (getIsInitialized()) {
      setAuthenticated(keycloak.authenticated || false);
      setLoading(false);

      // Set up token refresh if authenticated
      if (keycloak.authenticated) {
        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).catch((error) => {
            console.error("Failed to refresh token:", error);
            keycloak.logout();
          });
        };
      }
      return;
    }

    // If already initializing, don't start another initialization
    if (getIsInitializing()) {
      return;
    }

    const initKeycloak = async () => {
      setIsInitializing(true);
      try {
        // Use check-sso to silently check authentication without redirecting
        // This checks if user is already authenticated without forcing login
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          pkceMethod: "S256",
          checkLoginIframe: false,
          silentCheckSsoRedirectUri:
            typeof window !== "undefined"
              ? `${window.location.origin}/silent-check-sso.html`
              : undefined
        });

        setIsInitialized(true);
        setIsInitializing(false);
        setAuthenticated(authenticated);
        setLoading(false);

        // Token refresh - set up for authenticated users
        if (authenticated) {
          keycloak.onTokenExpired = () => {
            keycloak.updateToken(30).catch((error) => {
              console.error("Failed to refresh token:", error);
              // On token refresh failure, logout
              if (keycloak.logout) {
                keycloak.logout();
              }
            });
          };
        }
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
        setIsInitializing(false);
        setLoading(false);
        // Don't reset isInitialized on error - the instance might still be in a partial state
      }
    };

    initKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider
      value={{
        keycloak: keycloak as KeycloakInstance | null,
        authenticated,
        loading
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
