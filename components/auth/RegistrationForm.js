"use client";
import Input from "@/components/common/Input";
import { backend_secret_key } from "@/lib/constant";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const validatePassword = (password1, password2, username, email) => {
  if (password1 !== password2) {
    return "Passwords have not matched!";
  }

  // Check if password is at least 8 characters long
  if (password1.length < 8) {
    return "Your password must contain at least 8 characters.";
  }

  // Check if password contains characters other than digits
  if (/^\d+$/.test(password1)) {
    return "Your password can't be entirely numeric.";
  }

  // Check if password is too similar to other personal information
  const personalInfo = [username, email]; // Add personal information here, e.g., username, email, etc.
  if (
    personalInfo.some((info) =>
      password1.toLowerCase().includes(info.toLowerCase())
    )
  ) {
    return "Your password can't be too similar to your other personal information.";
  }

  return "successful";
};

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const passwordValidation = validatePassword(
      formData.password1,
      formData.password2,
      formData.username,
      formData.email
    );

    if (passwordValidation == "successful") {
      // Send registration data to the backend

      const response = await fetch(`${backendUrl}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Secret-Key": backend_secret_key,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, sign in the user
        await signIn("credentials", {
          username: formData.username,
          password: formData.password1,
          callbackUrl: "/",
        });
        toast.success("Account has been created successfully!");
        setIsLoading(false);
        router.back();
        router.refresh();
      } else {
        // Registration failed, handle errors
        setIsLoading(false);
        toast.error("Something is going wrong!");
        console.error(response);
      }
    } else {
      setIsLoading(false);
      toast.error(passwordValidation);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4" method="POST">
      <div>
        <Input
          type="text"
          id="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <span className="text-xs text-slate-400">
          Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
        </span>
      </div>

      <Input
        type="email"
        id="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div>
        <Input
          type="password"
          id="password1"
          label="Password"
          value={formData.password1}
          onChange={handleChange}
          required
        />
        <ul className="pt-2 list-disc list-inside text-xs text-slate-400">
          <li>
            Your password can’t be too similar to your other personal
            information.
          </li>
          <li>Your password must contain at least 8 characters.</li>
          <li>Your password can’t be a commonly used password.</li>
          <li>Your password can’t be entirely numeric.</li>
        </ul>
      </div>

      <div>
        <Input
          type="password"
          id="password2"
          label="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <span className="text-xs text-slate-400">
          Enter the same password as before, for verification.
        </span>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
          disabled={isLoading}
        >
          {isLoading ? <Spinner sm /> : "Create account"}
        </button>
      </div>

      <div className="text-sm flex justify-between">
        <span>Already have an account?</span>
        <Link
          href="/auth/sign-in"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Sign in instead!
        </Link>
      </div>
    </form>
  );
}
