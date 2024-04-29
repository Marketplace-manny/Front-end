"use client";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import ProductForm from "@/components/ProductForm";

const AddProduct = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="w-full h-full flexCenter flex-col">
        <LoginForm title={"Log in to start selling"} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flexCenter flex-col ">
      <h3 className="md:text-5xl text-3xl font-extrabold text-center max-w-5xl w-full">
        List Your Product
      </h3>
      <ProductForm type="add" />
    </div>
  );
};

export default AddProduct;
