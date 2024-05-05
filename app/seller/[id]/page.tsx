"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchProductsBySellerId } from "@/actions/actions";
import { Product } from "@/types/common.types";
import ProductList from "@/components/ProductList/ProductsList";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const SellerPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const productId = pathSegments[pathSegments.length - 1];
  const [sellerName, setSellerName] = useState("");
  const [sellerImage, setSellerImage] = useState("/seller_static.png");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      fetchProductsBySellerId(productId as string)
        .then((products) => {
          setProducts(products);
          if (products.length > 0) {
            setSellerName(products[0].seller_name);
            setSellerImage(sellerImage);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [productId]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <SkeletonCircle
              height="80px"
              width="80px"
              startColor="gray.100"
              endColor="gray.300"
            />
          ) : (
            <img
              src={sellerImage}
              alt="Seller"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          {isLoading ? (
            <SkeletonText
              height="40px"
              width="300px"
              startColor="gray.100"
              endColor="gray.300"
            />
          ) : (
            <h1 className="text-3xl font-bold">{sellerName}'s Products</h1>
          )}{" "}
        </div>
        <button
          className={`p-3 rounded-full font-medium bg-black text-white hover:bg-slate-800 sm:flex items-center gap-2  hidden`}
          onClick={toggleViewMode}
        >
          {viewMode === "grid" ? (
            <IoGridOutline size="1.5em" />
          ) : (
            <FaList size="1.5em" />
          )}
          <span>{viewMode === "grid" ? "List View" : "Grid View"}</span>
        </button>
      </div>
      <section
        className={`${
          viewMode === "grid"
            ? "grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6"
            : "flex flex-col gap-6"
        }`}
      >
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductList
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              sellerName={product.seller_name}
              imageUrl={"/placeholder-image.png"}
              view={viewMode as "" | "grid" | "list" | undefined}
            />
          ))
        ) : (
          <p className="text-center">No products found for this seller.</p>
        )}
      </section>
    </div>
  );
};

export default SellerPage;
