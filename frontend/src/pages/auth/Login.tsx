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
    <div className="h-screen flex items-center justify-center">
      <form className="w-[380px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />

        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Login"}
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </form>


    </div>

  );

}