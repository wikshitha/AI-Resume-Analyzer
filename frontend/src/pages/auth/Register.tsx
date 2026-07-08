import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

import { registerSchema, type RegisterSchema } from "./registerSchema";

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

      toast.success("Account created successfully!");
      navigate("/login");

    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };


  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#15173D]
        via-[#25265A]
        to-[#982598]
      "
    >

      {/* Background Glow */}

      <div
        className="
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-purple-500/30
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-32
          h-96
          w-96
          rounded-full
          bg-pink-400/20
          blur-3xl
        "
      />



      <div className="relative w-full max-w-md">


        {/* Brand */}

        <div className="text-center mb-8">


          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            AI Resume Analyzer
          </h1>


          <p
            className="
              mt-2
              text-sm
              text-purple-100
            "
          >
            Build your career with AI-powered resume insights
          </p>

        </div>





        {/* Register Card */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            rounded-3xl
            bg-[#F1E9E9]/95
            backdrop-blur-xl
            p-8
            shadow-2xl
            border
            border-white/20
            space-y-5
          "
        >


          <div>

            <h2
              className="
                text-xl
                font-semibold
                text-[#15173D]
              "
            >
              Create your account
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-600
              "
            >
              Start analyzing resumes smarter with AI
            </p>

          </div>





          {/* Name */}

          <div>

            <label
              className="
                text-sm
                font-medium
                text-[#15173D]
              "
            >
              Full Name
            </label>


            <Input
              placeholder="Anjitha Janidu"
              {...register("name")}
              className="
                mt-2
                h-12
                rounded-xl
                bg-white
                border-purple-200
                focus:border-[#982598]
                focus:ring-[#982598]/30
              "
            />


            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

          </div>





          {/* Email */}

          <div>

            <label
              className="
                text-sm
                font-medium
                text-[#15173D]
              "
            >
              Email Address
            </label>


            <Input
              placeholder="anjitha@gmail.com"
              {...register("email")}
              className="
                mt-2
                h-12
                rounded-xl
                bg-white
                border-purple-200
                focus:border-[#982598]
                focus:ring-[#982598]/30
              "
            />


            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>






          {/* Password */}

          <div>

            <label
              className="
                text-sm
                font-medium
                text-[#15173D]
              "
            >
              Password
            </label>


            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="
                mt-2
                h-12
                rounded-xl
                bg-white
                border-purple-200
                focus:border-[#982598]
                focus:ring-[#982598]/30
              "
            />


            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>






          {/* Submit */}

          <Button
            disabled={isSubmitting}
            className="
              w-full
              h-12
              rounded-xl
              bg-gradient-to-r
              from-[#982598]
              via-[#B832B8]
              to-[#15173D]
              hover:opacity-90
              text-white
              font-semibold
              shadow-lg
              transition-all
            "
          >
            {
              isSubmitting
                ? "Creating account..."
                : "Create Account"
            }

          </Button>







          {/* Login */}

          <p
            className="
              text-center
              text-sm
              text-gray-600
            "
          >

            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                font-semibold
                text-[#982598]
                hover:text-purple-700
                hover:underline
              "
            >
              Sign in
            </button>

          </p>


        </form>

      </div>

    </div>
  );
}