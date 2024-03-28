import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import Layout from "../layouts/Layout";
import * as apiClient from "../api-client.ts";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <Layout>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </Layout>
  );
};

export default AddHotel;
