import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

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

      login(res.data.token, res.data.user);

      toast.success("Login successful");

      navigate("/");

    } catch (err: any) {

      toast.error(
        err.response?.data?.message || "Login failed"
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
            Analyze resumes smarter with artificial intelligence
          </p>


        </div>





        {/* Login Card */}

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
              Welcome Back
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-600
              "
            >
              Login to continue analyzing your resumes
            </p>

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

          </div>







          {/* Button */}

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
              ? "Loading..."
              : "Login"
            }

          </Button>








          {/* Register Link */}

          <p
            className="
              text-center
              text-sm
              text-gray-600
            "
          >

            Don't have an account?{" "}


            <Link
              to="/register"
              className="
                font-semibold
                text-[#982598]
                hover:text-purple-700
                hover:underline
              "
            >
              Create Account
            </Link>


          </p>



        </form>



      </div>


    </div>

  );
}