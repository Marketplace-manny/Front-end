import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="lg">
      <Skeleton height="200px" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};

export default ProductCardSkeleton;
