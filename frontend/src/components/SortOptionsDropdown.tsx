import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

export default function SortOptionsDropdown({ onChange, sortOption }: Props) {
  return (
    <div className="text-right w-full min-w-[100px] flex-1">
      <Menu>
        <MenuButton className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-white border border-black px-3 py-1 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-gray-100 data-open:bg-gray-100">
          Sort By
          <ChevronDownIcon className="size-4 fill-black/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-black bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {SORT_OPTIONS.map((option, index) => (
            <MenuItem key={index}>
              <button
                onClick={() => onChange(option.value)}
                className={`group flex w-full items-center gap-2 rounded-lg cursor-pointer font-semibold px-1 py-1 ${
                  sortOption === option.value
                    ? "bg-orange-500 text-white"
                    : "data-focus:bg-gray-100 "
                }`}
              >
                {option.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
