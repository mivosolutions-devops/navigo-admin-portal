"use client";

import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCallback } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearUserState } from "@/lib/redux/features/user/userSlice";

export const useAuth = () => {
  const { keycloak, authenticated, loading } = useKeycloak();
  const dispatch = useAppDispatch();

  const login = useCallback(() => {
    if (keycloak && keycloak.login) {
      keycloak.login();
    }
  }, [keycloak]);

  const logout = useCallback(() => {
    // Clear Redux user state before logging out
    dispatch(clearUserState());
    if (keycloak && keycloak.logout) {
      keycloak.logout();
    }
  }, [keycloak, dispatch]);

  const getToken = useCallback(async () => {
    if (keycloak && authenticated && keycloak.updateToken) {
      try {
        await keycloak.updateToken(30);
        return keycloak.token || null;
      } catch (error) {
        console.error("Failed to get token:", error);
        return null;
      }
    }
    return null;
  }, [keycloak, authenticated]);

  const hasRole = useCallback(
    (role: string) => {
      if (
        keycloak &&
        authenticated &&
        keycloak.hasRealmRole &&
        keycloak.hasResourceRole
      ) {
        return keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role);
      }
      return false;
    },
    [keycloak, authenticated]
  );

  const hasAnyRole = useCallback(
    (roles: string[]) => {
      return roles.some((role) => hasRole(role));
    },
    [hasRole]
  );

  return {
    authenticated,
    loading,
    login,
    logout,
    getToken,
    hasRole,
    hasAnyRole,
    user: keycloak?.tokenParsed || null
  };
};
