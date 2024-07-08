"use client";
import Input from "@/components/common/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, password } = credentials;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      // Redirect or show a success message

      toast.success("Logged in successfully!");
      setIsLoading(false);
      setCredentials({ username: "", password: "" });
      await router.back();
    } else {
      // Handle sign-in error
      toast.error("Failed to log in!");
      setIsLoading(false);
      setCredentials({ username: "", password: "" });
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="space-y-4"
      action="#"
      method="POST"
    >
      <Input
        type="text"
        id="username"
        label="Username"
        autoComplete="username"
        value={credentials.username}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="password"
        label="Password"
        autoComplete="current-password"
        required
        value={credentials.password}
        onChange={handleChange}
      />

      <div className="">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
          disabled={isLoading}
        >
          {isLoading ? <Spinner md /> : "Sign in"}
        </button>
      </div>

      <div className="text-sm flex justify-between">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/auth/sign-up"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Create one here!
        </Link>
      </div>
    </form>
  );
}
