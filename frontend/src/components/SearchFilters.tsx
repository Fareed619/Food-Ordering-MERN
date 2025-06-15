import { useState } from "react";
import { cuisines } from "../constants/cuisines";

type Props = {
    onFilterChange: (filters: {
        cuisines: string[];
        sortOption: string;
        priceRange: string;
    }) => void;
};

const SearchFilters = ({ onFilterChange }: Props) => {
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState("deliveryTime");
    const [priceRange, setPriceRange] = useState("all");

    const handleCuisineChange = (cuisine: string) => {
        const updatedCuisines = selectedCuisines.includes(cuisine)
            ? selectedCuisines.filter((c) => c !== cuisine)
            : [...selectedCuisines, cuisine];

        setSelectedCuisines(updatedCuisines);
        onFilterChange({
            cuisines: updatedCuisines,
            sortOption,
            priceRange,
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        onFilterChange({
            cuisines: selectedCuisines,
            sortOption: e.target.value,
            priceRange,
        });
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(e.target.value);
        onFilterChange({
            cuisines: selectedCuisines,
            sortOption,
            priceRange: e.target.value,
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Sort Options */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Sort By</label>
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="deliveryTime">Delivery Time</option>
                    <option value="deliveryPrice">Delivery Price</option>
                    <option value="name">Restaurant Name</option>
                </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Price Range</label>
                <select
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="all">All Prices</option>
                    <option value="low">$0 - $5</option>
                    <option value="medium">$5 - $10</option>
                    <option value="high">$10+</option>
                </select>
            </div>

            {/* Cuisines */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Cuisines</label>
                <div className="grid grid-cols-2 gap-2">
                    {cuisines.map((cuisine) => (
                        <label key={cuisine} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedCuisines.includes(cuisine)}
                                onChange={() => handleCuisineChange(cuisine)}
                                className="rounded text-blue-600"
                            />
                            <span className="text-gray-700">{cuisine}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchFilters; 