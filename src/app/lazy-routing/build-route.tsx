
import { ComponentType, Suspense } from "react";
import lazyWithPreload from "react-lazy-with-preload";
import {
  IndexRouteObject,
  Navigate,
  NonIndexRouteObject,
} from "react-router-dom";

import ProtectedRoutes from "../protected-routes";
import { importWithRetry } from "./import-with-retry";
import Loader from "~/components/loader";

type RouteWithPreload =
  | (Omit<IndexRouteObject, "children"> & {
      children?: undefined;
      scopes?: string[];
    })
  | (Omit<NonIndexRouteObject, "children"> & {
      children?: RouteWithPreload[];
      scopes?: string[];
    });

export type BuildRouteInput = {
  path: string;
  children?: Array<BuildRouteInput>; // Ensure children have the same type as BuildRouteInput
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: () => Promise<{ default: ComponentType<any> }>;
  scopes?: string[];
  state: "unauthenticated" | "authenticated" | "admin" | "pending";
  defaultNavigation?: string;
};

/**
 * Constructs a route object compatible with React Router v6.
 *
 * @param path - The path of the route.
 * @param children - An array of child route objects.
 * @param factory - A function that returns a Promise resolving to the component to be lazy loaded.
 * @param scopes - An array of strings representing the scopes associated with the route.
 * @param state - The user state required by ProtectedRoutes.
 * @param defaultNavigation - The default navigation path if no specific route is matched.
 * @returns A route object ready to be used with React Router v6.
 */
export const buildRoute = ({
  path,
  children,
  factory,
  state,
  defaultNavigation,
}: BuildRouteInput): RouteWithPreload => {
  const Component = lazyWithPreload(() => importWithRetry(factory));

  const route: RouteWithPreload = {
    path,
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRoutes state={state}>
          <Component />
        </ProtectedRoutes>
      </Suspense>
    ),
  };

  if (children && children.length > 0) {
    route.children = children.map((child) => buildRoute(child));
    if (defaultNavigation) {
      route.children = [
        ...route.children,
        {
          index: true,
          element: <Navigate to={defaultNavigation} replace />,
        },
      ];
    }
  }

  return route;
};
