"use client";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/actions/actions";
import ProductList from "@/components/Products/ProductList";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { Product } from "@/common/types/common.types";
import { IoGridOutline, IoListOutline } from "react-icons/io5";

const ProductsMain = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex flex-row justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={toggleViewMode}
          className="p-3 rounded-full bg-black text-white hover:bg-slate-800 flex items-center gap-2"
          aria-label="Toggle View Mode"
        >
          {viewMode === "grid" ? (
            <IoGridOutline size="1.5em" />
          ) : (
            <IoListOutline size="1.5em" />
          )}
        </button>
      </header>
      <p className="text-gray-600 px-4">Products demo</p>
      <main
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10"
            : "flex flex-col gap-6"
        } p-4`}
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
              imageUrl="/placeholder-image.png"
              view={viewMode}
            />
          ))
        ) : (
          <p>{error || "No products found."}</p>
        )}
      </main>
    </div>
  );
};

export default ProductsMain;
