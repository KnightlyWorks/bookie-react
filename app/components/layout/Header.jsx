// app/components/layout/Header.jsx
import { useState } from "react";
import { Link } from "react-router";
import { cn } from "@utils/cn";
import { useMediaQuery } from "react-responsive";
import { tailwindBreakpoints } from "@/constants/tailwindBreakpoints";



export default function Header() {
  const [isBurgerMenuOpen, setBurgerMenu] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: tailwindBreakpoints.md - 1 });

  const toggleBurgerMenu = () => {
    setBurgerMenu(prev => {
      const newState = !prev;
      // Maybe will be moved higher in data flow because blocks body.
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  };

  const closeBurgerMenu = () => {
    setBurgerMenu(false);
    document.body.style.overflow = '';
  };

  return (
    <header className="flex gap-4 items-center justify-between p-4 bg-surface border-b-2 rounded-b-xl border-b-secondary transition-all duration-300">
      <Link to="/" onClick={closeBurgerMenu}>
        <h1 className="text-text-primary text-2xl font-bold">
          LuminaBookie
        </h1>
      </Link>

      {isMobile ?
        <div className="md:hidden">
            <button
              onClick={toggleBurgerMenu}
              className="p-2 text-text-primary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {/* Burger icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0  0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile menu overlay */}
            {isBurgerMenuOpen && (
              <div className="inset-0 fixed z-50 backdrop-blur-xl bg-background/95">
                <button
                  onClick={toggleBurgerMenu}
                  className="absolute top-4 right-4 p-2 text-text-primary hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Menu content */}
                <div className="flex items-center justify-center h-full">
                  <NavLinks onLinkClick={closeBurgerMenu} mobile />
                </div>
              </div>
            )}
          </div>
      
      : 
        <div className="hidden md:block">
          <NavLinks />
        </div>
      }
    </header>
  );
}

function NavLinks({ onLinkClick, mobile = false }) {

  const linkBase = "transition-colors hover:text-primary";

  return (
    <nav className={cn(
      "flex gap-6 items-center",
      mobile ? "flex-col" : "flex-row"
    )}>
      {/* 
       TODO: in future, if will a lot of pages, add glob-like pattern here
      */}
      <Link 
        to="/search" 
        onClick={onLinkClick} 
        className={cn(
          linkBase,
          mobile ? "text-2xl text-text-primary" : "text-text-secondary"
        )}
      >
        Search
      </Link>
      
      <Link 
        to="/about" 
        onClick={onLinkClick} 
        className={cn(
          linkBase,
          mobile ? "text-2xl text-text-primary" : "text-text-secondary"
        )}
      >
        About
      </Link>
    </nav>
  );
}