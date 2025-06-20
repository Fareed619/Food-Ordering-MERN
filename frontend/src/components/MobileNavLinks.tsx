import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
type Props = {
  closeMobileNav: () => void;
};

const MobileNavLinks = ({ closeMobileNav }: Props) => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        onClick={closeMobileNav}
        className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1.5 transition-all duration-400 block "
      >
        User Profile
      </Link>
      <Link
        to="/manage-resturant"
        onClick={closeMobileNav}
        className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1.5 transition-all duration-400 block "
      >
        Manage Restaurant
      </Link>
      <Link
        to="/order-status"
        onClick={closeMobileNav}
        className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1.5 transition-all duration-400 block "
      >
        Order Status
      </Link>
      <button
        className=" w-full font-medium cursor-pointer bg-orange-500 text-white rounded-lg mt-1 p-1 hover:bg-orange-600"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </>
  );
};

export default MobileNavLinks;
