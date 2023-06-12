import React, { useContext, createContext } from "react";
import { useProviderAuth, useProviderFake } from "./controller";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return (
      <Context.Provider value={auth}>
        {children}
      </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};
