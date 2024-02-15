import { userCardOptions } from "@/utility/config";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface UserCardDropdownProps {
  selected?:
    | {
        label: string;
        value: string;
      }
    | undefined;
  onView?: VoidFunction;
  onSelect?: (op: any) => void;
}

const UserCardDropdown: React.FC<UserCardDropdownProps> = ({ selected, onSelect, onView }) => {
  return (
    <Listbox
      value={selected}
      onChange={(op) => {
        if (op.value == "VIEW") {
          onView?.();
        } else if (op.value == "FULL" || op.value == "HALF") {
          onSelect?.(op);
        }
      }}
    >
      <div className="relative text-right">
        <Listbox.Button className="cursor-pointer rounded-lg bg-gray-200 p-2 text-center text-sm dark:bg-slate-900">
          <span className="block truncate">{selected?.label}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease duration-300 transform"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-300 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-4"
        >
          <Listbox.Options className="absolute right-0 top-10 z-10 max-h-60 overflow-auto rounded border-2 bg-white p-2 text-base text-sm shadow-lg focus:outline-none dark:border-0 dark:bg-slate-900">
            {userCardOptions.map((o) => (
              <Listbox.Option
                key={o.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none rounded py-2 pl-10 pr-2 ${
                    active ? "bg-gray-200 dark:bg-slate-800" : ""
                  }`
                }
                value={o}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{o.label}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">✓</span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default UserCardDropdown;
