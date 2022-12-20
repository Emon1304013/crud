import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {

    userSignOut()
      .then(() => {
        toast.success("User Logged out");
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav>
      <div
        className={'flex items-center justify-between px-4 mx-auto lg:max-w-7xl md:px-8'}
      >
          <div className="py-3 md:py-5">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  // style={{ height: "50px", width: "50px" }}
                  className="rounded-full h-6 w-6 lg:h-12 lg:w-12"
                  alt="company logo"
                />
              </div>
            </Link>
          </div>

        {/* For large screen  */}
        {user?.uid ? (
          <div>
            <div className="flex gap-2 items-center">
              {user && (
                <Link
                to="profile"
                className=" px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-gray-800">
                  Profile
                </Link>
              )}
              <Link
                className=" px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                onClick={handleLogOut}
              >
                Sign Out
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
