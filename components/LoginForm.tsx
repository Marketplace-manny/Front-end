"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignUp from "./SignUp";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SignIn = ({ title }: { title?: string }) => {
  const { data: session } = useSession();

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [emailSent, setEmailSent] = useState<Boolean>(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;

    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Sending magic link failed");
      }

      toast({
        title: "Magic link sent",
        description: "Check your email for the magic link to sign in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setEmailSent(true);
    } catch (error) {
      console.error("Magic link sending error:", error);
      setError("An error occurred while sending the magic link.");
    }
  };

  const handleSignOut = async () => {
    const result = await signOut({ redirect: false, callbackUrl: "/" });
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  if (isSignUp) {
    return <SignUp onSignIn={handleSignIn} />;
  }

  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-6  sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We have sent a magic link to your email. Click on the link to sign
            in.
          </p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            You are already signed in
          </h2>
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title ? title : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="font-medium text-orange-700 hover:text-orange-600"
              >
                sign up for a new account
              </button>
            </p>
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">
                {error} {/* Displaying the error message */}
              </p>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
