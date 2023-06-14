import { Form, Input, Button } from "antd";
import LoginPic from "../../../public/appIcon.png";
import Image from "next/image";
import { useAuth } from "../../../provider";
import { useGoogleLogin } from "@react-oauth/google";
import { request } from "../../../service/axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const { login, setLoadingAuthUser, user, getInfo } = useAuth();
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => successCallback(codeResponse),
    flow: "auth-code",
  });
  const handleGoogleLogin = () => {
    googleLogin();
  };
  const successCallback = async (codeResponse) => {
    setLoadingAuthUser(true);
    const { code } = codeResponse;
    await request("get", `/auth/google/callback`, {
      params: {
        code: code,
      },
    })
      .then(async (res) => {
        toast.success("Xác thực thành công");
        await getInfo();
        router.replace("/invoice");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Lỗi! " + err?.data?.message);
      });
    setLoadingAuthUser(false);
  };
  const handleAccountLogin = async (value) => {
    await login({
      username: value.username,
      password: value.password,
    });
    await getInfo();
    router.replace("/invoice");
  };
  useEffect(() => {
    setLoadingAuthUser(false);
  }, [user]);
  return (
    <div className="flex flex-col justify-center align-center items-center gap-2 w-full">
      <Image src={LoginPic} alt="Login" className="text-[#487CB9] w-16 mb-1" />
      <p className="text-white text-xl font-bold">Đăng nhập</p>
      <div className="flex flex-col gap-2 divide-y divide-blue-200 w-full">
        <Form
          layout="vertical"
          name="basic"
          onFinish={handleAccountLogin}
          autoComplete="off"
          className="flex flex-col gap-2 w-full mt-4"
        >
          <div className="flex flex-col gap-2 w-full mb-2">
            <p className="text-white text-xs font-semibold">Số điện thoại</p>
            <Form.Item name="username">
              <Input
                className="rounded-lg bg-secondary py-1.5 px-2 text-xs font-medium w-full text-primary"
                placeholder="SĐT đăng ký trên hợp đồng"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2 w-full mb-2">
            <p className="text-white text-xs font-semibold">Mật khẩu</p>
            <Form.Item name="password">
              <Input
                type="password"
                className="rounded-lg bg-secondary py-1.5 px-2 text-xs font-medium w-full text-primary"
                placeholder="Mắc định là ngày sinh (DDMMYYYY)"
              />
            </Form.Item>
          </div>
          <Form.Item className="w-full">
            <Button
              className="w-full border border-white rounded-lg text-white font-medium text-xs py-2 px-3 font-medium"
              htmlType="submit"
            >
              Đăng nhập bằng tài khoản
            </Button>
          </Form.Item>
        </Form>
        <p className="divider-y divider-white"></p>
        <button
          className="bg-white rounded-lg text-primary font-medium text-xs py-2 px-3 font-medium"
          onClick={() => handleGoogleLogin()}
        >
          Đăng nhập bằng Google
        </button>
      </div>
      <p className="text-right text-xs text-white w-full">Hỗ trợ: 0987654321</p>
    </div>
  );
}
