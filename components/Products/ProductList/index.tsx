import Image from "next/image";
import Link from "next/link";
import ProductName from "../components/ProductName";
import ProductDescription from "../components/ProductDescription";
import { ProductListProps } from "@/common/types/common.types";

const ProductList = ({
  id,
  name,
  price,
  description,
  seller_name,
  imageUrl,
  view = "grid",
}: ProductListProps) => {
  const imageContainerClass = view === "grid" ? "w-full h-60" : "w-1/3 h-60";
  const cardClass =
    view === "grid"
      ? "bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
      : "bg-white shadow-lg flex items-center rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4";

  return (
    <Link href={`/products/${id}`} passHref>
      <div className={cardClass}>
        <div className={`relative ${imageContainerClass}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw"
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-200 h-full">
              No image available
            </div>
          )}
        </div>
        <div className="p-4">
          <ProductName name={name} />
          <ProductDescription description={description} view={view} />
          <p className="text-lg font-semibold text-gray-800">
            ₺{price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Seller's name: {seller_name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
