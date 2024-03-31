import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import Layout from "../layouts/Layout";
import * as apiClient from "./../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

const SearchPage = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="sticky p-5 border rounded-lg border-slate-300 h-fit top-10">
          <div className="space-y-5">
            <h3 className="pb-5 text-lg font-semibold border-b border-slate-300">
              Filter by:
            </h3>
            <StarRatingFilter />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </span>

            {/* TODO sort options */}
          </div>
          {hotelData?.data.map((hotel, index) => (
            <SearchResultsCard hotel={hotel} key={index} />
          ))}
          <div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
