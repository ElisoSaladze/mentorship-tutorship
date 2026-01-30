import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reissueToken } from "~/api/auth/api";
import { keys } from "~/api/keys";
import { paths } from "~/app/routes/paths";
import constate from "constate";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useLogoutAcrossTabs } from "./logout-across-tabs";
import { getUser } from "~/api/users/api";

type NotAuthUser = {
  state: "unauthenticated";
};

export type AuthUserResponse = {
  accessToken: string;
  refreshToken: string;
};

type AuthUser = {
  state: "authenticated";
} & AuthUserResponse;

type User = NotAuthUser | AuthUser;

export let globalAccessToken: string | null = null;

/**
 * Sets the global access token.
 *
 * @param accessToken The access token to set.
 */
export const setGlobalAccessToken = (accessToken: string | null) => {
  console.log("Setting global access token:", accessToken);
  globalAccessToken = accessToken;
};

const cookies = new Cookies();

/**
 * Custom hook for handling authentication logic.
 *
 * @returns An object containing authentication-related state and functions.
 */
const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User>({
    state: cookies.get("refreshToken") ? "authenticated" : "unauthenticated",
  } as User);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const refreshTimeoutRef = useRef<number | null>(null);

  const { data: tokenData } = useQuery({
    queryKey: keys.reissueToken.token(),
    queryFn: reissueToken,
    enabled: Boolean(cookies.get("refreshToken")) && !isLoggingOut,
    staleTime: Infinity,
  });

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    error: fetchError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
    enabled: user.state === "authenticated" && !isLoggingOut,
  });

  /**
   * Authorizes the user.
   *
   * @param user The user response object containing the access token.
   */
  const authorize = useCallback((user: AuthUserResponse) => {
    if (user) {
      const decodedJWT: { exp: number } = jwtDecode(user.accessToken);
      const expiresIn = decodedJWT.exp * 1000 - Date.now();

      const expires = new Date();
      expires.setTime(expiresIn);

      setGlobalAccessToken(user.accessToken);

      cookies.set("refreshToken", user.refreshToken, {
        path: "/",
        expires: new Date(2_147_483_647 * 1000),
      });

      const newUser: AuthUser = {
        state: "authenticated",
        ...user,
      };

      setUser(newUser);
    } else {
      setUser({ state: "unauthenticated" });
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      authorize(tokenData);
    }
  }, [authorize, tokenData]);

  /**
   * Initializes the user state.
   *
   * @param user A boolean indicating whether the user is authenticated.
   */
  const initialize = useCallback((user: boolean) => {
    if (user) {
      const newUser: NotAuthUser = {
        state: "unauthenticated",
      };

      setUser(newUser);
    } else {
      setUser({ state: "unauthenticated" });
    }
  }, []);

  /**
   * Unauthorizes the user and performs necessary cleanup.
   */
  const unauthorize = useLogoutAcrossTabs(
    useCallback(() => {
      // Prevent multiple logout attempts
      if (isLoggingOut) return;

      setIsLoggingOut(true);

      // Clear timeout first
      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

      // Clear token and cookie
      setGlobalAccessToken(null);
      cookies.remove("refreshToken", { path: "/" });

      // Clear all cached data to prevent stale data on new login
      queryClient.clear();

      // Update state
      setUser({ state: "unauthenticated" });

      // Navigate after state is cleared
      setTimeout(() => {
        navigate(paths.login, { replace: true });
        setIsLoggingOut(false);
      }, 0);
    }, [navigate, queryClient, isLoggingOut])
  );

  // Check if user has ADMIN role
  const isAdmin = userDetails?.roles?.includes("ADMIN") ?? false;

  return {
    user,
    setUser,
    authorize,
    initialize,
    unauthorize,
    isAuthenticated: user.state === "authenticated" && !isLoggingOut,
    isAdmin,
    isLoggingOut,
    state: user.state,
    userDetails,
    isLoadingUserDetails,
    fetchError,
  } as const;
};

/**
 * Provider component for managing authentication state.
 */
export const [AuthProvider, useAuthContext] = constate(useAuth);
