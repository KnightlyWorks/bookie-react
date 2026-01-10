import { useState } from "react";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function FieldSetGroup({ legend, children, openByDefault = false }) {
  const [isOpen, setIsOpen] = useState(openByDefault);
  const [wasOpened, setWasOpened] = useState(openByDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!wasOpened) setWasOpened(true);
  };

  return (
    <fieldset 
      className={clsx(
        "border rounded-lg p-4 transition-colors shadow-md",
        "border-borde hover:border-border-hover bg-surface"
      )}
    >
      <legend
        onClick={toggleOpen}
        className={clsx(
          "cursor-pointer px-2 flex items-center gap-2 transition-colors font-medium select-none",
          "text-text-primary hover:text-primary"
        )}
      >
        <ChevronRightIcon
          className={clsx(
            "w-5 h-5 transition-transform duration-200 ease-in-out",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        />
        {legend}
      </legend>

      <div 
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {wasOpened && (
            <div className="pt-2 text-text-primary">
              {children}
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}