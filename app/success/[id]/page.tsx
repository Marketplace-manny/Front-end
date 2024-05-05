"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const productId = pathSegments[pathSegments.length - 1];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <Image
        src="/success.svg"
        alt="Success"
        width={200}
        height={200}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>
      <p className="mb-4">Your payment has been processed successfully.</p>
      <p className="text-sm mb-8">Product ID: {productId}</p>
      <Link href="/">
        <p className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Continue Shopping
        </p>
      </Link>
      {session ? (
        <Link href={`/order/${productId}`}>
          <p className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            View Your Order
          </p>
        </Link>
      ) : (
        <Link href="/login">
          <p className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Sign in to View Your Order
          </p>
        </Link>
      )}
    </div>
  );
};

export default Page;
