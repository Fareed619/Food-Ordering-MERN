import { useNavigate } from "react-router-dom";
import { paddingX } from "../constants/style";
import SearchBar, { SearchForm } from "./SearchBar";

const SearchCardHome = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div
      className={`${paddingX}  bg-white p-4 rounded shadow-xl   -translate-y-15 md:-translate-y-27 lg:-translate-y-40`}
    >
      <div className="w-full p-2 pb-6">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-orange-600 ">
          Tuch into a takeaway today
        </h2>
        <p className="text-center text-base md:text-lg py-1">
          Food is just a click way
        </p>

        <SearchBar
          placeHolder="Search by City or Town"
          onSumbit={handleSearchSubmit}
        />
      </div>
    </div>
  );
};

export default SearchCardHome;
