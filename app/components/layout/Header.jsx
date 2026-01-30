// app/components/layout/Header.jsx
import { useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "react-responsive";
import { tailwindBreakpoints } from "@constants/tailwindBreakpoints";
import NavigateLinks from "@components/ui/Links/NavLinks";

export default function Header() {
  const [isBurgerMenuOpen, setBurgerMenu] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: tailwindBreakpoints.md - 1 });

  const toggleBurgerMenu = () => {
    setBurgerMenu((prev) => {
      const newState = !prev;
      // Maybe will be moved higher in data flow because blocks body.
      document.body.style.overflow = newState ? "hidden" : "";
      return newState;
    });
  };

  const closeBurgerMenu = () => {
    setBurgerMenu(false);
    document.body.style.overflow = "";
  };

  return (
    <header className="bg-surface border-b-secondary flex items-center justify-between gap-4 rounded-b-xl border-b-2 p-4 transition-all duration-300">
      <Link to="/" onClick={closeBurgerMenu}>
        <h1 className="text-text-primary text-2xl font-bold">LuminaBookie</h1>
      </Link>

      {isMobile ? (
        <div className="md:hidden">
          <button
            onClick={toggleBurgerMenu}
            className="text-text-primary hover:text-primary p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {/* Burger icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0  0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile menu overlay */}
          {isBurgerMenuOpen && (
            <div className="bg-background/95 fixed inset-0 z-50 backdrop-blur-xl">
              <button
                onClick={toggleBurgerMenu}
                className="text-text-primary hover:text-primary absolute top-4 right-4 p-2 transition-colors"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu content */}
              <div className="flex h-full items-center justify-center">
                <NavigateLinks className={"flex flex-col items-center gap-6"} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavigateLinks className="flex items-center gap-6" />
      )}
    </header>
  );
}
