import { ProductNameProps } from "@/common/types/common.types";

const ProductName = ({ name }: ProductNameProps) => {
  const displayName = name.length > 30 ? `${name.substring(0, 30)}...` : name;
  return (
    <p className="text-xl font-semibold text-gray-900 truncate">
      {displayName}
    </p>
  );
};

export default ProductName;
