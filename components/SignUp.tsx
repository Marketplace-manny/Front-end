"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/actions";
import CommonInput from "@/common/components/CommonInput";
import Button from "@/common/components/Button";

interface SignUpProps {
  onSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    console.log("email", email);
    console.log("password ", password);
    console.log("name", name);
    console.log("surname", surname);
    console.log("phone_number", phone_number);

    try {
      const registrationResponse = await signUp({
        email,
        password,
        name,
        surname,
        phone_number,
      });

      toast({
        title: "Account created successfully",
        description:
          "Your account has been created successfully. Redirecting...",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });

      const token = registrationResponse;

      router.push("/");

      const signInResult = await signIn("credentials", {
        token,
        redirect: false,
      });

      if (signInResult?.error) {
        setError(signInResult.error);
      } else {
        onSignIn();
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSignIn}
            className="font-medium text-orange-700 hover:text-orange-700 transition duration-150 ease-in-out"
          >
            Sign in
          </button>
        </p>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <CommonInput
            id="first-name"
            type="text"
            placeholder="First Name"
            value={name}
            onChange={setName}
            required
            autoComplete="given-name"
          />
          <CommonInput
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={surname}
            onChange={setSurname}
            required
            autoComplete="family-name"
          />
          <CommonInput
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
          />
          <CommonInput
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required
            autoComplete="new-password"
          />
          <CommonInput
            id="phone-number"
            type="tel"
            placeholder="Phone Number"
            value={phone_number}
            onChange={setPhone_number}
            required
            autoComplete="tel"
            isPhoneNumber={true}
          />

          <Button
            title="Sign Up"
            isSubmitting={loading}
            classNames="w-full bg-orange-900 hover:bg-orange-700 "
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
