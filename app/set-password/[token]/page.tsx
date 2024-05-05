"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { setPassword } from "@/actions/actions"; // Ensure the correct import path

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const token = pathSegments[pathSegments.length - 1];
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Resetting any previous error messages

    try {
      await setPassword(newPassword, token);
      // Optional: Redirect or display a success message

      signIn("credentials", { token, redirect: false });
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Password Reset Successful
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Your password has been updated successfully!
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter new password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Set New Password
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default SetPassword;
