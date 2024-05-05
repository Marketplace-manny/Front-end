"use client";

import { useEffect, useState } from "react";
import { getPaymentPage, signUp } from "@/actions/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import email from "next-auth/providers/email";

export default function CheckoutSignupPage({}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const quantity = Number(searchParams.get("quantity")) || 1;
  const pathSegments = pathname.split("/");
  const productId = pathSegments[pathSegments.length - 1];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const res = await signUp({
        email,
        name,
        surname,
        phone_number,
      });

      const token = res;

      toast({
        title: "Account created successfully",
        description:
          "Your account has been created successfully. Redirecting...",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });

      const signInResult = await signIn("credentials", {
        token,
        redirect: false,
      });

      console.log("signInResult", signInResult);

      if (signInResult?.error) {
        setError(signInResult.error);
      } else {
        console.log("token", token);
        await initiatePayment(token ?? "", quantity);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const initiatePayment = async (accessToken: string, quantity: number) => {
    try {
      const paymentPageUrl = await getPaymentPage(
        productId,
        quantity,
        accessToken
      );
      router.push(paymentPageUrl);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="container mt-10 flex w-full ">
          <div className="w-1/2">
            <h2 className="text-xl font-bold">Checkout Product</h2>
            <p>Product Name: {}</p>
          </div>
          <div className="w-1/2 p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Your Information</h2>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone-number" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone-number"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Phone Number (123-456-7890)"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up & Checkout
            </button>
          </div>
        </div>
        {/* Submit button */}
      </form>
    </div>
  );
}
