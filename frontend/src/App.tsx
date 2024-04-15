import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/:hotelId" element={<Details />} />

        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={<Booking />} />
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            <Route path="/my-hotels" element={<MyHotels />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
