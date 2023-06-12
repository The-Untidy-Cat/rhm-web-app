import LoginPage from "../components/Login";
import React, { useEffect } from "react";
import { useAuth } from "../provider/index";
import { LoadingPage } from "../components/Loading";

const AuthWrapper = ({ children }) => {
  const { loadingAuthUser, isLoggedIn, isLoading } = useAuth();
  return (!loadingAuthUser && isLoggedIn) || isLoading ? (
    <>
      {isLoading && <LoadingPage />}
      {children}
    </>
  ) : (
    <>
      {loadingAuthUser && <LoadingPage />}
      <LoginPage />
    </>
  );
};
export { AuthWrapper };
