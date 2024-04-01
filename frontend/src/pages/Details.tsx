import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layouts/Layout";

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
            {Array.from({ length: hotel.starRating }).map(() => (
              <AiFillStar className="fill-yellow-400" />
            ))}
          </span>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {hotel.imageUrls.map((image) => (
            <div className="h-[300px]">
              <img
                src={image}
                alt={hotel.name}
                className="object-cover object-center w-full h-full rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {hotel.facilities.map((facility) => (
            <div className="p-3 border rounded-sm border-slate-300">
              {facility}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Details;
