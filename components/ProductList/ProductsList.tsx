import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  price: number;
  description: string;
  sellerName: string;
  imageUrl?: string;
  view?: "grid" | "list" | "";
};

const ProductList = ({
  id,
  name,
  price,
  description,
  sellerName,
  imageUrl,
  view = "grid",
}: Props) => {
  const Description =
    description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;

  const Name = name.length > 30 ? `${name.substring(0, 30)}...` : name;

  const gridClass =
    "bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4";
  const listClass =
    "bg-white shadow-lg flex items-center rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4";
  const gridDescriptionClass = "text-gray-700 mt-1 overflow-hidden h-16";
  const listDescriptionClass = "text-gray-700 mt-1 overflow-hidden flex-1";

  return (
    <Link href={`/products/${id}`} passHref>
      <div className={view === "grid" ? gridClass : listClass}>
        <div
          className={`relative ${
            view === "grid" ? "w-full h-60" : "w-1/3 h-60"
          }`}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
          ) : (
            <div className="flex items-center justify-center bg-gray-200 h-full">
              No image available
            </div>
          )}
        </div>
        <div className="p-4 ">
          <p className="text-xl font-semibold text-gray-900 truncate">{Name}</p>
          <div
            className={
              view === "grid" ? gridDescriptionClass : listDescriptionClass
            }
          >
            {Description}
          </div>
          <p className="text-lg font-semibold text-gray-800 ">
            ${price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Seller's name: {sellerName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
