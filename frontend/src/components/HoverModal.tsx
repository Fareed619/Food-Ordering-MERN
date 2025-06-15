import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function HoverModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover className="relative inline-block">
      <Popover.Button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="font-semibold border p-1 rounded-lg cursor-pointer"
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
          className="absolute z-10 mt-2 w-56 bg-white rounded shadow-lg p-4 border"
        >
          <h4 className="font-semibold mb-2">Category</h4>
          <form className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Books</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Electronics</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Clothing</span>
            </label>
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
