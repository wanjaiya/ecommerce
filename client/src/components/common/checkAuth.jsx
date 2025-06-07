import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, verify, children }) {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !verify &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/reset-password") ||
      location.pathname.includes("/account-verify")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    !isAuthenticated &&
    verify &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/reset-password") ||
      location.pathname.includes("/account-verify")
    )
  ) {
    return <Navigate to="/auth/account-verify" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
