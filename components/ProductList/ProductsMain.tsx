"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/actions/actions";
import ProductCard from "@/components/ProductList/ProductsList";
import { Product } from "@/types/common.types";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";

export default function ProductsMain() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          className="p-3 rounded-full font-medium bg-black text-white hover:bg-slate-800 sm:flex items-center gap-2  hidden"
          onClick={toggleViewMode}
        >
          {viewMode === "grid" ? (
            <IoGridOutline size="1.5em" />
          ) : (
            <FaList size="1.5em" />
          )}
        </button>
      </div>
      <p className="text-gray-600 mt-2">Products demo</p>

      <section
        className={` pt-6 ${
          viewMode === "grid"
            ? "grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10  w-full"
            : "flex flex-col gap-6"
        }`}
      >
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)
        ) : products.length > 0 ? (
          products
            .slice()
            .reverse()
            .map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                sellerName={product.seller_name}
                imageUrl="/placeholder-image.png"
                view={viewMode as "" | "grid" | "list" | undefined}
              />
            ))
        ) : (
          <p>{error || "No products found."}</p>
        )}
      </section>
    </div>
  );
}
