import { useEffect, useState } from "react";
import { request } from "../service/axios";
import { toast } from "react-hot-toast";

export const useProviderAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);

  const login = async (user) => {
    try {
      setLoadingAuthUser(true);
      setLoggedIn(false);
      const response = await request("post", "/auth/login", user);
      if (response.code == 200) {
        setLoggedIn(true);
        toast.success("Đăng nhập thành công");
        await getInfo();
      } else {
        toast.error("Lỗi. Vui lòng thử lại");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      toast.error("Lỗi! " + err?.data?.message);
      return false;
    } finally {
      setLoadingAuthUser(false);
    }
  };

  const getInfo = async () => {
    setLoading(true);
    try {
      const response = await request("get", "/user/info");
      if (response.code === 200) {
        setUser(response.data);
        setLoggedIn(true);
        setLoadingAuthUser(false);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      setLoggedIn(false);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      setLoadingAuthUser(true);
      const response = await request("get", "/user/logout");
      if (response.code == 200) {
        setUser(null);
        setLoggedIn(false);
      }
    } catch (err) {
    } finally {
      setLoadingAuthUser(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Return the user object and auth methods
  return {
    isLoggedIn,
    isLoading,
    user,
    loadingAuthUser,
    setLoadingAuthUser,
    login,
    setLoading,
    setLoggedIn,
    setUser,
    getInfo,
    logout,
  };
};

export const useProviderFake = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  const defaultUser = {
    firstName: "IT",
    lastName: "Admin",
    department: "Administrator",
  };

  function getInfo() {
    setLoading(true);
    setLoggedIn(false);
    setUser(defaultUser);
    setLoggedIn(true);
    setLoading(false);
    console.log("Login successful");
  }

  const logOut = async () => {
    setLoading(true);
    setLoggedIn(false);
    setUser({});
    setLoggedIn(false);
    setLoading(false);
    console.log("Login successful");
    CustomMessage({ content: "Đã đăng xuất" }, "success");
  };

  useEffect(() => {
    // getInfo();
  }, []);

  // Return the user object and auth methods
  return {
    isLoggedIn,
    isLoading,
    user,
    setLoading,
    setLoggedIn,
    setUser,
    getInfo,
    logOut,
  };
};
