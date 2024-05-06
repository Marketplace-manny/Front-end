import { signIn } from "next-auth/react";
import Button from "../common/components/Button";

const AuthProviders = () => {
  const handleSignInClick = () => {
    signIn();
  };

  return (
    <Button
      classNames="hover:bg-orange-600 bg-orange-700 hover:text-white"
      title="Sign in"
      handleClick={handleSignInClick}
    />
  );
};

export default AuthProviders;
