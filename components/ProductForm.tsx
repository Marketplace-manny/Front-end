"use client";
import { useEffect, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

type Props = {
  type: string;
};

const ProductForm = ({ type }: Props) => {
  const { data: session } = useSession();

  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    supply: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/product/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            supply: parseInt(form.supply, 10),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Product created successfully:", result);
        toast({
          title: "Product created successfully!",
          description: "Your product has been added to the list.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        router.push("/");
      } else {
        console.error("Failed to create product:", result.message);
        toast({
          title: "Failed to create product",
          description:
            result.message || "There was an error processing your request.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Network error, please try again later.",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto;
  }"
    >
      <FormField
        title="Product's Name"
        state={form.name}
        placeholder="Enter product name"
        setState={(value) => handleStateChange("name", value)}
      />
      <FormField
        title="Product's Description"
        state={form.description}
        placeholder="Enter product description"
        isTextArea={true}
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="Price (TL)"
        state={form.price}
        placeholder="Enter price in TL"
        isNumber={true}
        min={0}
        setState={(value) => handleStateChange("price", value)}
      />
      <FormField
        title="Supply"
        state={form.supply}
        placeholder="Enter supply count"
        isNumber={true}
        min={0}
        setState={(value) => handleStateChange("supply", value)}
      />

      <div>
        <Button
          title={
            isSubmitting
              ? `${type === "add" ? "Adding" : "Updating"} product...`
              : `${type === "add" ? "Add" : "Update"} product`
          }
          type="submit"
          isSubmitting={isSubmitting}
          leftIcon={isSubmitting ? "" : "/plus.svg"}
        />
      </div>
    </form>
  );
};

export default ProductForm;
