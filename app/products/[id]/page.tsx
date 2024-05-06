"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteProductById,
  fetchProductById,
  getPaymentPage,
  updateProductById,
} from "@/actions/actions";
import { Product } from "@/common/types/common.types";
import { useSession } from "next-auth/react";
import FormField from "@/components/FormField";
import { useToast } from "@chakra-ui/react";
import QuantitySelector from "@/common/components/QuantitySelector";

const Page = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();
  const toast = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    supply: "",
  });
  const [error, setError] = useState("");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const productId = pathSegments[pathSegments.length - 1];
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  useEffect(() => {
    if (productId) {
      fetchProductById(productId)
        .then((product) => {
          if (product) {
            setProduct(product);
            setFormData({
              name: product.name || "",
              description: product.description || "",
              price: product.price ? product.price.toString() : "0",
              supply: product.supply ? product.supply.toString() : "0",
            });
          } else {
            setError("Product not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("Failed to load product details.");
        });
    }
  }, [productId, lastUpdated]);

  const handleStateChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        supply: Number(formData.supply),
      };
      const updatedProduct = await updateProductById(
        productId,
        updatedData,
        session?.user.accessToken || ""
      );

      if (updatedProduct) {
        setProduct(updatedProduct);
        setFormData({
          name: updatedProduct.name || "",
          description: updatedProduct.description || "",
          price: updatedProduct.price.toString(),
          supply: updatedProduct.supply.toString(),
        });
        setEditMode(false);
        setLastUpdated(Date.now());
      } else {
        throw new Error("Product update returned no data");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product.");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProductById(productId, session?.user.accessToken || "");
      toast({
        title: "Product deleted.",
        description: "Your product has been successfully deleted.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      localStorage.setItem("prevPage", window.location.pathname);

      const productId = product?.id ?? "";
      const productQuantity = quantity; // Assuming 'quantity' is defined in this scope
      router.push(`/buy-product/${productId}?quantity=${productQuantity}`);
      return;
    }
    try {
      const paymentPageUrl = await getPaymentPage(
        product?.id ?? "",
        quantity,
        session?.user.accessToken || ""
      );

      router.push(paymentPageUrl);
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast({
        title: "Error",
        description: "Failed to initiate payment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  const isOwner = isAuthenticated && session?.user?.id === product.seller_id;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full w-full flex items-center justify-center">
      {product && (
        <div className="max-w-screen-xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:col-span-1">
            <Image
              src={"/placeholder-image.png"}
              alt={product.name}
              width={640}
              height={640}
              className="rounded-lg"
            />
          </div>
          <div className="md:col-span-2 p-6 space-y-4">
            {editMode ? (
              <>
                <FormField
                  title="Product's Name"
                  state={formData.name}
                  placeholder="Enter product name"
                  setState={(value) => handleStateChange("name", value)}
                />
                <FormField
                  title="Description"
                  state={formData.description}
                  placeholder="Enter product description"
                  isTextArea={true}
                  setState={(value) => handleStateChange("description", value)}
                />
                <FormField
                  title="Price"
                  state={formData.price}
                  placeholder="Enter price"
                  isNumber={true}
                  setState={(value) => handleStateChange("price", value)}
                />
                <FormField
                  title="Supply"
                  state={formData.supply}
                  placeholder="Enter supply amount"
                  isNumber={true}
                  setState={(value) => handleStateChange("supply", value)}
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleUpdateProduct}
                    className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-gray text-white font-bold rounded hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDeleteProduct}
                    className="px-6 py-2 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition-colors duration-200"
                  >
                    Delete Product
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-700">{product.price} TL</p>
                <p className="text-gray-600">{product.description}</p>
                <div className="text-sm text-gray-500 flex flex-row gap-1 items-center">
                  Sold by:
                  <Link href={`/seller/${product?.seller_id}`}>
                    <p className="text-orange-700 hover:text-orange-600 font-bold ">
                      {product.seller_name}
                    </p>
                  </Link>
                </div>
                <div className="flex space-x-4">
                  <button
                    disabled
                    className="p-3 rounded-lg text-sm font-medium bg-gray text-white  hover:bg-gray-400 cursor-not-allowed"
                    title="Coming Soon"
                  >
                    Add to Cart
                  </button>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white shadow-sm p-2 rounded-md">
                      <QuantitySelector
                        quantity={quantity}
                        onIncrement={increment}
                        onDecrement={decrement}
                      />
                    </div>
                    <button
                      onClick={handleBuyNow}
                      className="px-6 py-2 text-white rounded-lg text-lg font-medium bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                      Buy Now
                    </button>
                  </div>

                  {isOwner && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="p-3 text-gray-100 rounded-lg text-sm font-medium bg-yellow-500 hover:bg-yellow-600"
                    >
                      Edit Product
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
