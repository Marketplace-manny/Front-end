import { ProductDescriptionProps } from "@/common/types/common.types";

const ProductDescription = ({ description, view }: ProductDescriptionProps) => {
  const displayDescription =
    description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;
  const descriptionClass =
    view === "grid"
      ? "text-gray-700 mt-1 overflow-hidden h-16"
      : "text-gray-700 mt-1 overflow-hidden flex-1";
  return <div className={descriptionClass}>{displayDescription}</div>;
};

export default ProductDescription;
