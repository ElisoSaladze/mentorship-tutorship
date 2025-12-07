import { paths } from "~/app/routes/paths";
import { useAuthContext } from "~/providers/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  state: "unauthenticated" | "authenticated" | "pending";
  children: ReactNode;
};

const ProtectedRoutes = ({ state, children }: Props) => {
  const { isAuthenticated, state: currentState } = useAuthContext();

  if (isAuthenticated && currentState !== state) {
    return <Navigate to={paths.userDetails} />;
  }

  if (!isAuthenticated && currentState !== state) {
    return <Navigate to={paths.home} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
