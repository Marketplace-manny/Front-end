"use client";
import { useEffect } from "react";

import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Authenticate = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const token = pathSegments[pathSegments.length - 1];
  const router = useRouter();

  useEffect(() => {
    if (token && status !== "authenticated") {
      signIn("credentials", { token: token, redirect: false })
        .then(() => {
          router.push("/"); // Redirect to homepage or dashboard
        })
        .catch((error) => {
          console.error("Failed to sign in with token:", error);
        });
    }
  }, [token, status, router]);

  if (status === "loading") {
    return <div>Verifying your login...</div>;
  }

  return (
    <div>
      If you are not redirected, <a href="/">click here</a>.
    </div>
  );
};

export default Authenticate;
