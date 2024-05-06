"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchProductsBySellerId } from "@/actions/actions";
import { Product } from "@/common/types/common.types";
import ProductList from "@/components/Products/ProductList";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { IoGridOutline, IoListOutline } from "react-icons/io5";

const SellerPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    image: "/seller_static.png",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const pathname = usePathname();
  const sellerId = pathname.split("/").pop();

  useEffect(() => {
    if (sellerId) {
      fetchProductsBySellerId(sellerId)
        .then((fetchedProducts) => {
          setProducts(fetchedProducts);
          if (fetchedProducts.length > 0) {
            setSellerDetails({
              name: fetchedProducts[0].seller_name,
              image: "/placeholder-image.png",
            });
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [sellerId]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <>
              <SkeletonCircle size="20" />
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </>
          ) : (
            <>
              <img
                src={sellerDetails.image}
                alt="Seller"
                className="w-20 h-20 rounded-full object-cover"
              />
              <h1 className="text-3xl font-bold">
                {sellerDetails.name}'s Products
              </h1>
            </>
          )}
        </div>
        <button
          onClick={toggleViewMode}
          className="p-3 rounded-full font-medium bg-black text-white hover:bg-slate-800 flex items-center gap-2"
          aria-label={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
        >
          {viewMode === "grid" ? (
            <IoGridOutline size="1.5em" />
          ) : (
            <IoListOutline size="1.5em" />
          )}
          <span>{viewMode === "grid" ? "List View" : "Grid View"}</span>
        </button>
      </div>
      <section
        className={`${
          viewMode === "grid"
            ? "grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6"
            : "flex flex-col gap-6"
        }`}
      >
        {isLoading ? (
          Array.from({ length: 8 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductList
              key={product.id}
              {...product}
              imageUrl={"/placeholder-image.png"}
              view={viewMode}
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
