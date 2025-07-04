import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const { user, logout, isLoading } = useAuth0();

  const dropdownBoxRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const logoutHandler = () => {
    logout();
    toast.success("Logged Out Successfully");
    setShowDropDown(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownBoxRef.current &&
      !dropdownBoxRef.current.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setShowDropDown(false);
    }
  }, []);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, handleClickOutside]);

  return (
    <div className="relative">
      <button
        className="cursor-pointer text-orange-500 "
        onClick={() => setShowDropDown(!showDropdown)}
        ref={buttonRef}
      >
        {!isLoading && user && user.picture ? (
          <img src={user?.picture} alt="picture" className="size-9 rounded-full inline-flex" />
        ) : (
          <CircleUserRound className="inline-block" size={25} />
        )}
        <span className="ml-1  text-lg font-medium"> {user?.email}</span>
      </button>
      {showDropdown && (
        <ul
          className={` w-52 rounded-box bg-base-100 shadow-sm absolute top-12 right-0 p-2 transition-all 
            opacity-95 transition-discrete starting:opacity-0 duration-500`}
          ref={dropdownBoxRef}
        >
          <Link to="/user-profile" onClick={() => setShowDropDown(false)}>
            <li className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1 transition-all duration-400 ">
              User Profile
            </li>
          </Link>
          <Link to="/manage-resturant" onClick={() => setShowDropDown(false)}>
            <li className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1 transition-all duration-400 ">
              Manage Restaurant
            </li>
          </Link>
          <Link to="/order-status" onClick={() => setShowDropDown(false)}>
            <li className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1 transition-all duration-400 ">
              Order Status
            </li>
          </Link>

          <li
            onClick={logoutHandler}
            className="font-medium cursor-pointer bg-orange-500 text-white rounded-lg mt-1 p-1 hover:bg-orange-600"
          >
            <button className="cursor-pointer">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
