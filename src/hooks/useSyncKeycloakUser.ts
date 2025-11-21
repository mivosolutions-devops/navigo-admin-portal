"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  setUserState,
  clearUserState
} from "@/lib/redux/features/user/userSlice";
import keycloak from "@/lib/keycloak";

/**
 * Hook to fetch and sync user profile from Keycloak userinfo endpoint to Redux store
 * This fetches the user account data from Keycloak's loadUserProfile
 */
export const useSyncKeycloakUser = () => {
  const { authenticated, loading: authLoading } = useAuth();
  const dispatch = useAppDispatch();
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    // Don't fetch if auth is still loading or already fetched
    if (authLoading || profileFetched || !keycloak) return;

    if (authenticated) {
      // Fetch user profile from Keycloak userinfo endpoint
      const fetchUserProfile = async () => {
        setProfileLoading(true);
        try {
          // Ensure token is fresh
          await keycloak.updateToken(30);

          // Load user info from Keycloak userinfo endpoint
          const userInfo = await keycloak.loadUserInfo();

          console.log("userInfo", userInfo);

          // Decode token to get roles
          const tokenParsed = keycloak.tokenParsed;

          // Extract realm roles as objects
          const realmRoles: TUserRole[] = (
            tokenParsed?.realm_access?.roles || []
          ).map((roleName: string) => ({
            name: roleName,
            source: "realm"
          }));

          // Extract resource roles from all resources as objects
          const resourceRoles: TUserRole[] = tokenParsed?.resource_access
            ? Object.entries(tokenParsed.resource_access).flatMap(
                ([resourceName, access]: [string, any]) => {
                  const roles = access.roles || [];
                  return roles.map((roleName: string) => ({
                    name: roleName,
                    source: resourceName
                  }));
                }
              )
            : [];

          // Combine all roles
          const allRoles: TUserRole[] = [...realmRoles, ...resourceRoles];

          // Extract attributes if available (userinfo may not have attributes, use token fallback)
          const attributes = (userInfo as any).attributes || {};
          const phoneNumber = Array.isArray(attributes.phoneNumber)
            ? attributes.phoneNumber[0]
            : (attributes.phoneNumber as string | undefined) || "";

          // Store user account data in Redux
          dispatch(
            setUserState({
              id: (userInfo as any).sub || tokenParsed?.sub || "",
              username:
                (userInfo as any).preferred_username ||
                tokenParsed?.preferred_username ||
                "",
              email: (userInfo as any).email || tokenParsed?.email || "",
              emailVerified:
                (userInfo as any).email_verified ||
                tokenParsed?.email_verified ||
                false,
              firstName:
                (userInfo as any).given_name || tokenParsed?.given_name || "",
              lastName:
                (userInfo as any).family_name || tokenParsed?.family_name || "",
              phoneNumber: phoneNumber || "",
              profilePicture: userInfo.profilePicture || "",
              roles: allRoles
            })
          );

          setProfileFetched(true);
        } catch (error: any) {
          console.error("Failed to fetch user profile from Keycloak:", error);

          // Fallback to token data if userinfo fails
          if (keycloak.tokenParsed) {
            const tokenData = keycloak.tokenParsed;

            // Extract roles from token as objects
            const realmRoles: TUserRole[] = (
              tokenData.realm_access?.roles || []
            ).map((roleName: string) => ({
              name: roleName,
              source: "realm"
            }));

            const resourceRoles: TUserRole[] = tokenData.resource_access
              ? Object.entries(tokenData.resource_access).flatMap(
                  ([resourceName, access]: [string, any]) => {
                    const roles = access.roles || [];
                    return roles.map((roleName: string) => ({
                      name: roleName,
                      source: resourceName
                    }));
                  }
                )
              : [];

            dispatch(
              setUserState({
                id: tokenData.sub || "",
                username: tokenData.preferred_username || "",
                email: tokenData.email || tokenData.preferred_username || "",
                emailVerified: tokenData.email_verified || false,
                firstName: tokenData.given_name || "",
                lastName: tokenData.family_name || "",
                phoneNumber: "",
                profilePicture: tokenData.picture || "",
                roles: [...realmRoles, ...resourceRoles]
              })
            );
          }
        } finally {
          setProfileLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      // Clear user data if not authenticated
      dispatch(clearUserState());
      setProfileFetched(false);
    }
  }, [authenticated, authLoading, dispatch, profileFetched]);

  return { profileLoading };
};
