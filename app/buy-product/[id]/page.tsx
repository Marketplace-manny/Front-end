"use client";

import { useEffect, useState } from "react";
import { getPaymentPage, signUp, fetchProductById } from "@/actions/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import CommonInput from "@/common/components/CommonInput";
import Button from "@/common/components/Button";
import { Product } from "@/common/types/common.types";
import Image from "next/image";

export default function CheckoutSignupPage({}) {
  const [product, setProduct] = useState<Product | null>(null);
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

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const productData = await fetchProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

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
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-center items-start">
        <div className="lg:w-1/2 lg:mr-8 ">
          {product ? (
            <>
              <div className="mb-6">
                <Image
                  src={"/placeholder-image.png"}
                  alt="Product Image"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-xl font-semibold">Price: ${product.price}</p>
              <p className="text-xl font-semibold">Quantity: {quantity}</p>{" "}
              <p className="text-gray-700 text-lg mb-4">
                {product.description}
              </p>
            </>
          ) : (
            <p className="text-lg">Loading product details...</p>
          )}
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-8">Sign Up to Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-2 w-full">
            <CommonInput
              id="first-name"
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(value) => setName(value)}
              required
              className="rounded-xl"
            />
            <CommonInput
              id="last-name"
              type="text"
              placeholder="Last Name"
              value={surname}
              onChange={(value) => setSurname(value)}
              required
              className="rounded-xl"
            />
            <CommonInput
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(value) => setEmail(value)}
              required
              className="rounded-xl"
            />
            <CommonInput
              id="phone-number"
              type="tel"
              placeholder="Phone Number (123-456-7890)"
              value={phone_number}
              onChange={(value) => setPhone_number(value)}
              required
              isPhoneNumber
              className="rounded-xl mb-4"
            />
            <Button
              type="submit"
              title="Sign Up & Checkout"
              classNames=" w-full"
            />
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
