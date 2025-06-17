import { useAuth0 } from "@auth0/auth0-react";
import { X } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";

type Props = {
  closeMobileNav: () => void;
};

const MobileNav = ({ closeMobileNav }: Props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <aside
      className="fixed right-0  lg:hidden w-full sm:w-[50%] h-[100vh]  bg-white z-30 shadow p-4 transition-transform translate-0   starting:translate-x-[100vh] linear duration-400  
         transition-discrete"
    >
      <div className="flex justify-between items-center">
        {isAuthenticated ? (
          <div>
            {user?.picture && (
              <img
                src={user.picture}
                alt="picture"
                className="size-9 rounded-full inline-flex"
              />
            )}
            <span className=" text-lg font-medium ml-1"> {user?.email}</span>
          </div>
        ) : (
          <h2 className="text-lg font-bold">Welcome to FD Foody!</h2>
        )}
        <X
          className="text-gray-500 text-base cursor-pointer"
          onClick={closeMobileNav}
        />
      </div>
      <hr className="my-3" />
      {!isAuthenticated ? (
        <button
          onClick={async () => await loginWithRedirect()}
          className="bg-orange-400 p-2 text-center text-white w-full rounded-lg cursor-pointer"
        >
          Log In
        </button>
      ) : (
        <MobileNavLinks closeMobileNav={closeMobileNav} />
      )}
    </aside>
  );
};

export default MobileNav;
