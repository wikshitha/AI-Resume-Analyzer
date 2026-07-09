import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiFileText } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

import { registerSchema,  type RegisterSchema } from "./registerSchema";

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
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[380px] space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold text-center">Create Account</h1>

        {/* NAME */}
        <div>
          <Input placeholder="Full Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </form>
    </div>
  );
}