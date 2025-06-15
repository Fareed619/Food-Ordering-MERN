import { Popover, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { cuisines } from "../constants/cuisines";
import { checkboxInputCuisine } from "../constants/style";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
};

export default function FilterByCuisines({
  onChange,
  selectedCuisines,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisinesList);
  };

  return (
    <Popover className="relative inline-block min-w-[140px] w-[90%] flex-1">
      <Popover.Button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="font-semibold border p-1 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        Filter by cuisines
      </Popover.Button>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          static
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute z-10 mt-2 w-fit max-h-[400px]  bg-white rounded shadow-lg p-4 border overflow-y-auto"
        >
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2">
            {cuisines.map((cuisine, index) => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className={`${checkboxInputCuisine} cursor-pointer`}
                    name="radio-group"
                    value={cuisine}
                    id={`cuisine_${cuisine}`}
                    checked={isSelected}
                    onChange={handleCuisinesChange}
                  />
                  <span>{cuisine}</span>
                </label>
              );
            })}
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
