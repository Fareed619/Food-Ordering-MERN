import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import { Restaurant } from "../api/MyRestaurantApi";

import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { Loader2 } from "lucide-react";
import { standartPage } from "../constants/style";
import FilterByCuisines from "../components/FilterByCuisines";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchRestauantCard from "../components/SearchRestauantCard";
import PaginationSelector from "../components/PaginationSelector";
import SortOptionsDropdown from "../components/SortOptionsDropdown";

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const onSubmit = (searchFormValues: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormValues.searchQuery,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      page: 1,
      selectedCuisines,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({ ...prev, page: 1, sortOption }));
  };

  // TODO: FIND PLACE IN THE UI TO PUT THAT BUTTON
  const resetAllOptions = () => {
    setSearchState((prev) => ({
      ...prev,
      page: 1,
      selectedCuisines: [],
      sortOption: "bestMatch",
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return (
      <div className={`${standartPage}`}>
        <Loader2 className={`animate-spin mx-auto size-12 text-orange-500`} />
      </div>
    );
  }
  if (!results?.data || !city) {
    return (
      <div className={`${standartPage}  `}>
        <h2 className="w-fit mx-auto font-bold text-2xl">No results found</h2>
      </div>
    );
  }

  return (
    <div className={`${standartPage}`}>
      <SearchBar
        placeHolder="Search by  Cuisine or Restuarnat Name"
        onSumbit={onSubmit}
        onReset={resetSearch}
        searchQuery={searchState.searchQuery}
      />

      {/* filters section */}
      <div className="relative w-full  mt-10 md:mt-2 flex flex-wrap justify-between items-center">
        <FilterByCuisines
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
        />

        <SortOptionsDropdown
          sortOption={searchState.sortOption}
          onChange={setSortOption}
        />
      </div>

      {/* Displayed restaurant section */}
      <SearchResultInfo total={results.pagination.total} city={city} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
        {" "}
        {results?.data.map((restaurant) => (
          <SearchRestauantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {/* Pagination Component */}
      <PaginationSelector
        page={results?.pagination.page}
        pages={results?.pagination.pages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SearchPage;
