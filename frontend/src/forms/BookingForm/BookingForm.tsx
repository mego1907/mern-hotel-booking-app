import React from "react";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 p-5 border rounded-lg border-slate-300">
      <span className="text-3xl font-bold">Confirm Your Details</span>

      <div className="grid grid-cols-2 gap-6">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            type="text"
            readOnly
            disabled
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            {...register("firstName")}
          />
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            type="text"
            readOnly
            disabled
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            {...register("lastName")}
          />
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Email
          <input
            type="email"
            readOnly
            disabled
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="p-4 bg-blue-200 rounded-md">
          <div className="text-lg font-semibold">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="p-2 text-sm border rounded-md"
        />
      </div>
    </form>
  );
};

export default BookingForm;
