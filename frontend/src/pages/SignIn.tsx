import { useForm } from "react-hook-form";
import Layout from "../layouts/Layout";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");

      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Layout>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>

        <label className="flex-1 text-base font-bold text-gray-700">
          Email
          <input
            type="email"
            className="w-full px-3 py-2 font-normal border rounded outline-none"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className="flex-1 text-base font-bold text-gray-700">
          Password
          <input
            type="password"
            className="w-full px-3 py-2 font-normal border rounded outline-none"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>

        <span className="flex items-center justify-between">
          <span className="text-base">
            Not Registered?
            <Link to="/register" className="underline">
              Create an account here
            </Link>
          </span>
          <button className="px-4 py-2 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500">
            Login
          </button>
        </span>
      </form>
    </Layout>
  );
};

export default SignIn;
