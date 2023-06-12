import { useEffect } from "react";
import Invoice from "./invoice/index";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.push("/invoice") }, []);
}
