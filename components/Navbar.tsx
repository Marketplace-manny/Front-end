"use client";
import { useSession } from "next-auth/react";
import { NavLinks } from "@/constants";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import AuthProviders from "./AuthProviders";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="lg:px-20 px-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <p className="text-2xl font-bold text-orange-800 hover:text-orange-600">
              MMP
            </p>
          </Link>
          <ul className="hidden lg:flex items-center space-x-8 font-bold">
            {!isHomePage && (
              <li>
                <Link href="/">
                  <p className="text-gray-600 hover:text-orange-600 transition duration-150 ease-in-out">
                    Explore
                  </p>
                </Link>
              </li>
            )}
            {NavLinks.map((link) => (
              <li key={link.key}>
                <Link href={link?.href}>
                  <p className="text-gray-600 hover:text-orange-600 transition duration-150 ease-in-out">
                    {link.text}
                  </p>
                </Link>
              </li>
            ))}

            {session && session.user ? (
              <Link href={`/seller/${session?.user?.id}`}>
                <p className="text-gray-600 hover:text-orange-600 transition duration-150 ease-in-out">
                  My Products
                </p>
              </Link>
            ) : null}
          </ul>
          <div className="flex items-center gap-4">
            {session && session.user ? <ProfileMenu /> : <AuthProviders />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
