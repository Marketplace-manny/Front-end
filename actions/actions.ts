import { Product } from "@/types/common.types";

export async function fetchProducts(
  page: number = 1,
  perPage: number = 10
): Promise<Product[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/product/list`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
}

export async function fetchProductById(productId: string): Promise<Product> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/product/get/${productId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  const data = await response.json();
  return data.product;
}

export async function fetchProductsBySellerId(
  sellerId: string
): Promise<Product[]> {
  const url = new URL(
    `/product/list/${sellerId}`,
    process.env.NEXT_PUBLIC_API_URL
  );

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch products for seller ID: ${sellerId}`);
  }
  const data = await response.json();
  return data.products;
}

export async function updateProductById(
  productId: string,
  productData: Partial<Product>,
  authToken: string
): Promise<Product> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/update/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = await response.json();
  return data.product;
}

export async function deleteProductById(
  productId: string,
  authToken: string
): Promise<boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/delete/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to delete product: ${message}`);
  }

  const data = await response.json();
  return data.is_deleted;
}

export async function getPaymentPage(
  productId: string,
  quantity: number,
  authToken: string
): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-payment-page`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        id: productId,
        quantity: quantity,
      }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to initiate payment: ${message}`);
  }

  const data = await response.json();
  return data.paymentPage;
}
