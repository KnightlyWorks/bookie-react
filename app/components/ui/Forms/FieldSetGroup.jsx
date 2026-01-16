//FieldSetGroud.jsx
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
        "rounded-lg border p-4 shadow-md transition-colors",
        "border-borde hover:border-border-hover bg-surface"
      )}
    >
      <legend
        onClick={toggleOpen}
        className={clsx(
          "flex cursor-pointer items-center gap-2 px-2 font-medium transition-colors select-none",
          "text-text-primary hover:text-primary"
        )}
      >
        <ChevronRightIcon
          className={clsx(
            "h-5 w-5 transition-transform duration-200 ease-in-out",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        />
        {legend}
      </legend>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {wasOpened && <div className="text-text-primary pt-2">{children}</div>}
        </div>
      </div>
    </fieldset>
  );
}
