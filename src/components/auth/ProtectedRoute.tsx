"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { authenticated, loading, hasAnyRole, login } = useAuth();
  const router = useRouter();
  const redirectAttempted = useRef(false);

  // Redirect to Keycloak login if not authenticated (only once)
  // Only redirect if we're sure the user is not authenticated (not during initial check)
  useEffect(() => {
    if (!loading && !authenticated && !redirectAttempted.current) {
      // Small delay to ensure Keycloak has finished checking
      const timer = setTimeout(() => {
        if (!authenticated) {
          redirectAttempted.current = true;
          login();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [authenticated, loading, login]);

  // Handle role-based access control
  useEffect(() => {
    if (
      !loading &&
      authenticated &&
      requiredRoles &&
      requiredRoles.length > 0 &&
      !hasAnyRole(requiredRoles)
    ) {
      // Redirect to forbidden page if user doesn't have required roles
      router.push("/forbidden");
    }
  }, [authenticated, loading, requiredRoles, hasAnyRole, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authenticated) {
    // Show loading while redirecting to Keycloak
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (
    requiredRoles &&
    requiredRoles.length > 0 &&
    !hasAnyRole(requiredRoles)
  ) {
    return null;
  }

  return <>{children}</>;
};

