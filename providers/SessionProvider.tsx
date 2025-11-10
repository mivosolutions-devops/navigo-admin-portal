"use client";

import { FC, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { isTokenExpired, setAuthorizationToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { authService } from "@/services";

const SessionProvider: FC<TLayoutProps> = ({ children }) => {
  const router = useRouter();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const currentUser = Cookies.get("currentUser");

      if (!currentUser) {
        window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}?redirect_uri=${window.location.href}`;
        return;
      }

      if (isTokenExpired(currentUser, "REFRESH")) {
        Cookies.remove("currentUser", {
          domain: process.env.NEXT_PUBLIC_DOMAIN_NAME,
        });
        window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}?redirect_uri=${window.location.href}`;
        return;
      }

      if (isTokenExpired(currentUser, "ACCESS")) {
        try {
          const response = await authService.refreshToken(
            JSON.parse(currentUser)?.tokens?.refreshToken,
          );

          if (response && response.status === 200) {
            setAuthorizationToken(
              {
                ...JSON.parse(currentUser),
                tokens: response.data.payload.tokens,
                isAllowed: true,
              },
              { isClient: true },
            );
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    intervalRef.current = setInterval(checkTokenExpiration, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { href } = window.location;
      const url = new URL(href);

      if (
        url.searchParams.has("accessToken") ||
        url.searchParams.has("refreshToken")
      ) {
        url.searchParams.delete("accessToken");
        url.searchParams.delete("refreshToken");

        const newSearchParams = url.searchParams.toString();
        const newPath = `${url.pathname}${newSearchParams ? `?${newSearchParams}` : ""}`;

        router.replace(newPath);
      }
    }
  }, [router]);

  return children;
};

export default SessionProvider;
