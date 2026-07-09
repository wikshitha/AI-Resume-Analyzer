import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiFileText } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema, type LoginSchema } from "./loginSchema";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await authService.login(data);

      login(
        res.data.token,
        res.data.user
      );

      toast.success("Login successful");

      navigate("/");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <FiFileText size={28} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Login to AI Resume Analyzer
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />

            <Input
              className="h-11 pl-10"
              placeholder="Email Address"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />

            <Input
              className="h-11 pl-10"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>

          <Button
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-blue-600 font-semibold hover:bg-blue-700"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?

          <Link
            to="/register"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}