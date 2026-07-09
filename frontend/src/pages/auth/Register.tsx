import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiFileText } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

import {
  registerSchema,
  type RegisterSchema,
} from "./registerSchema";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await api.post("/auth/register", data);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <FiFileText size={28} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Join AI Resume Analyzer
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />

              <Input
                className="h-11 pl-10"
                placeholder="Full Name"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />

              <Input
                className="h-11 pl-10"
                placeholder="Email Address"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />

              <Input
                className="h-11 pl-10"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?

          <Link
            to="/login"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}