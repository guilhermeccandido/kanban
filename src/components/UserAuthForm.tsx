"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react";

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem",
        description: "There was an error loggin in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="max-w-fit mx-auto"
      onClick={handleLogin}
      isLoading={isLoading}
    >
      Log In With Google
    </Button>
  );
};

export default UserAuthForm;
