import Head from "next/head";
import LoginForm from "../Form/Login/index";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Xác thực</title>
      </Head>
      <main className="bg-primary">
        <div className="flex min-h-screen w-screen max-w-sm flex-col items-center justify-center align-center mx-auto px-2">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
