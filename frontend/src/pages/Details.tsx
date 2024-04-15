import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layouts/Layout";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Details = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <span className="flex ">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <AiFillStar className="fill-yellow-400" key={i} />
            ))}
          </span>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {hotel.imageUrls.map((image, i) => (
            <div className="h-[300px]" key={i}>
              <img
                src={image}
                alt={hotel.name}
                className="object-cover object-center w-full h-full rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {hotel.facilities.map((facility, i) => (
            <div className="p-3 border rounded-sm border-slate-300" key={i}>
              {facility}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="whitespace-pre-line">{hotel.description}</div>
          <div className="h-fit">
            <GuestInfoForm
              hotelId={hotel._id}
              pricePerNight={hotel.pricePerNight}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
