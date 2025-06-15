import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="w-full mt-4">
      <span className="font-semibold text-center">
        {total} Restaurants found in {city} {` `}
        <Link to="/" className="underline font-bold">Change Location</Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
