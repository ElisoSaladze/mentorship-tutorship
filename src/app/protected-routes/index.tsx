import { paths } from "~/app/routes/paths";
import { useAuthContext } from "~/providers/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  state: "unauthenticated" | "authenticated" | "admin" | "pending";
  children: ReactNode;
};

const ProtectedRoutes = ({ state, children }: Props) => {
  const { isAuthenticated, isAdmin } = useAuthContext();

  // Handle admin routes - must be authenticated AND have admin role
  if (state === "admin") {
    if (!isAuthenticated) {
      return <Navigate to={paths.login} />;
    }
    if (!isAdmin) {
      return <Navigate to={paths.main} />;
    }
    return <>{children}</>;
  }

  // Handle authenticated routes
  if (state === "authenticated") {
    if (!isAuthenticated) {
      return <Navigate to={paths.login} />;
    }
    return <>{children}</>;
  }

  // Handle unauthenticated routes
  if (state === "unauthenticated") {
    if (isAuthenticated) {
      return <Navigate to={paths.main} />;
    }
    return <>{children}</>;
  }

  // Handle pending state (loading)
  return <>{children}</>;
};

export default ProtectedRoutes;
