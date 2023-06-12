import { useAuth } from "../provider";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserCircle, FaFileInvoiceDollar } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

const NavItem = ({ icon, href }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      {pathname.includes(href) ? (
        <p className="text-2xl text-white flex justify-center align-center items-center">
          {icon}
        </p>
      ) : (
        <p className="text-2xl text-secondary flex justify-center align-center items-center">
          {icon}
        </p>
      )}
    </>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="flex justify-between align-center items-center px-24 w-full h-16 bg-primary rounded-t-xl shadow-lg m-0 py-0">
      <Link href="/invoice">
        <NavItem icon={<FaFileInvoiceDollar />} href="/invoice" />
      </Link>
      <Link href="/ticket">
        <NavItem icon={<BiSupport />} href="/ticket" />
      </Link>
    </div>
  );
};

const MobileLayout = ({ children = null, title = null }) => {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <main className="bg-bg w-full min-h-screen h-full overflow-y-hidden">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="absolute mx-auto left-0 right-0 flex h-full w-screen max-w-sm flex-col items-center justify-start align-start">
        <div className="flex justify-between align-center items-center px-3 w-full mt-3 h-20">
          <h1 className="font-bold text-primary text-2xl">{title}</h1>
          <FaUserCircle
            onClick={() => router.push("/profile")}
            className="text-2xl text-primary"
          />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <div className="w-full h-fit flex flex-col justify-center align-center items-center gap-3 px-3 py-2">
            {children}
          </div>
        </div>
        <Navbar />
      </div>
    </main>
  );
};

const ViewDetailLayout = ({ children = null, title = null, navbar = true }) => {
  const router = useRouter();
  return (
    <main className="bg-bg w-full min-h-screen h-full overflow-y-hidden">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="absolute mx-auto left-0 right-0 flex h-full w-screen max-w-sm flex-col items-center justify-start align-start">
        <div className="flex justify-start align-center items-center px-3 gap-2 w-full mt-1 h-20">
          <IoIosArrowBack
            onClick={() => router.back()}
            className="text-2xl text-primary p-0 cursor-pointer"
          />
          <h1 className="font-bold text-primary text-lg ">{title}</h1>
        </div>
        <div className="w-full h-full overflow-y-auto">
          <div className="w-full h-fit flex flex-col justify-center align-center items-center gap-3 px-3 py-2">
            {children}
          </div>
        </div>
        {navbar && <Navbar />}
      </div>
    </main>
  );
};

export { MobileLayout, ViewDetailLayout };
