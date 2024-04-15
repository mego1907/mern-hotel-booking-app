import Layout from "../layouts/Layout";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import LatestDestinationCard from "../components/LatestDestinationCard";

const HomePage = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowsHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <Layout>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">Latest Destinations</h2>
        <p>Most recent destinations added by our hosts</p>

        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {topRowsHotels.map((hotel, i) => (
              <LatestDestinationCard hotel={hotel} key={i} />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {bottomRowHotels.map((hotel, i) => (
              <LatestDestinationCard hotel={hotel} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
