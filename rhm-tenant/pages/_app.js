import "../styles/globals.css";
// import "antd/dist/antd.less";
import { AuthWrapper } from "../wrapper";
import { AuthProvider } from "../provider";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Toaster />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
