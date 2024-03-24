import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="py-6 bg-blue-800 ">
      <div className="container flex justify-between mx-auto">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">MernHolidays.com</Link>
        </span>

        <span className="flex items-center gap-3 space-x-2 font-medium text-white">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in">
              <button className="px-6 py-2 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500">
                Sign In
              </button>
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
