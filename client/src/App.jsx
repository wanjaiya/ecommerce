import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import EmailVerify from "./pages/auth/emailVerify";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./components/not-found";
import ShoppingHome from "./pages/shoping-view/home";
import ShoppingAccount from "./pages/shoping-view/account";
import ShoppingCheckout from "./pages/shoping-view/checkout";
import ShoppingListing from "./pages/shoping-view/listing";
import CheckAuth from "./components/common/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import ResetPassword from "./pages/auth/resetPassword";

function App() {
  const { isAuthenticated, user, isLoading, verify } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}
      <Routes>
        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              verify={verify}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="account-verify" element={<EmailVerify />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              verify={verify}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          {/* Add your admin routes here */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          {/* Add more admin routes as needed */}
        </Route>

        {/* Shopping routes*/}
        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              verify={verify}
            >
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>

        {/* Not Found route */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
