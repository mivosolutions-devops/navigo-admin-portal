import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  checkAllowedToViewPortal,
  isTokenExpired,
  redirectWithError,
  setAuthorizationToken,
} from "./lib/utils";
import { authService } from "./services";

const FORBIDDEN_PATH = "/forbidden";
const PREFERRED_EXP_TIME_THRESHOLD = 60; // seconds

export default async function middleware(request: NextRequest) {
  console.log("Middleware processing...");

  try {
    const { currentUserCookie, accessToken, refreshToken } =
      extractTokens(request);

    if (!currentUserCookie) {
      return redirectWithError(request, "User not authenticated");
    }

    if (
      isTokenExpired(currentUserCookie, "REFRESH", PREFERRED_EXP_TIME_THRESHOLD)
    ) {
      return redirectWithError(request, "Refresh token expired");
    }

    if (
      isTokenExpired(currentUserCookie, "ACCESS", PREFERRED_EXP_TIME_THRESHOLD)
    ) {
      return await handleTokenRefresh(request, currentUserCookie);
    }

    const tokens = JSON.parse(currentUserCookie).tokens;
    const viewPortal = await checkAllowedToViewPortal(tokens);
    if (!viewPortal) {
      return redirectWithError(
        request,
        "Not allowed to view portal",
        FORBIDDEN_PATH,
      );
    }

    if (accessToken && refreshToken) {
      console.log("Proceeding with setting tokens...");
      return setAuthorizationToken(
        { tokens: { accessToken, refreshToken }, isAllowed: true },
        { isClient: false },
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return redirectWithError(request, "An unexpected error occurred");
  }
}

function extractTokens(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("accessToken");
  const refreshToken = request.nextUrl.searchParams.get("refreshToken");
  let currentUserCookie = request.cookies.get("currentUser")?.value;

  if (!currentUserCookie && accessToken && refreshToken) {
    currentUserCookie = JSON.stringify({
      tokens: { accessToken, refreshToken },
    });
  }

  return { currentUserCookie, accessToken, refreshToken };
}

async function handleTokenRefresh(
  request: NextRequest,
  currentUserCookie: string,
) {
  try {
    const tokens = JSON.parse(currentUserCookie).tokens;
    const refreshResponse = await authService.refreshToken(tokens.refreshToken);
    if (refreshResponse?.status === 200) {
      const newTokens = refreshResponse.data.payload.tokens as TAuthTokens;
      const viewPortal = await checkAllowedToViewPortal(newTokens);

      if (!viewPortal) {
        return redirectWithError(
          request,
          "Not allowed to view portal",
          FORBIDDEN_PATH,
        );
      }

      return setAuthorizationToken(
        { tokens: newTokens, isAllowed: true },
        { isClient: false },
      );
    } else {
      return redirectWithError(request, "Failed to refresh tokens");
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    return redirectWithError(request, "Error refreshing tokens");
  }
}

export const config = {
  matcher: [
    "/((?!api|forbidden|_next/static|_next/image|favicon.ico|favicon.svg|analytics-card-bg.svg|flag.svg|logo-for-pages.svg).*)",
  ],
};
