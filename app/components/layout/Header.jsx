// app/components/layout/Header.jsx
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useRouteLoaderData, useSubmit } from "react-router";
import { useMediaQuery } from "react-responsive";
import { tailwindBreakpoints } from "@constants/tailwindBreakpoints";
import NavigateLinks from "@components/ui/Links/NavLinks";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@utils/cn";
import HoldButton from "@components/ui/Buttons/HoldButton";

const NavMenu = ({ children }) => {
  const [isBurgerMenuOpen, setBurgerMenu] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: tailwindBreakpoints.md - 1 });
  useEffect(() => {
    if (!isMobile) {
      return () => {
        document.body.style.overflow = "";
      };
    }
    if (isBurgerMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isBurgerMenuOpen, isMobile]);

  const toggleBurgerMenu = () => setBurgerMenu((prev) => !prev);
  const closeBurgerMenu = () => setBurgerMenu(false);

  return (
    <>
      {isMobile ? (
        <div>
          <button
            onClick={toggleBurgerMenu}
            className="text-text-primary hover:text-primary p-2 transition-colors"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="size-6" />
          </button>

          {/* Mobile menu overlay */}
          {isBurgerMenuOpen && (
            <div className="bg-background/95 fixed inset-0 z-50 backdrop-blur-xl">
              <button
                onClick={toggleBurgerMenu}
                className="text-text-primary hover:text-primary absolute top-4 right-4 p-2 transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="size-6" />
              </button>

              {/* Menu content */}
              <NavigateLinks className={"flex h-full flex-col items-center justify-center gap-6"}>
                {children}
              </NavigateLinks>
            </div>
          )}
        </div>
      ) : (
        <NavigateLinks className="flex flex-row-reverse items-center gap-6">
          {children}
        </NavigateLinks>
      )}
    </>
  );
};

export default function Header() {
  const { user } = useRouteLoaderData("root");

  const submit = useSubmit();
  const logOutFunction = () => {
    submit(null, { action: "/api/logout", method: "post" });
  };

  return (
    <header className="bg-surface border-b-secondary flex items-center justify-between gap-4 rounded-b-xl border-b-2 p-4 transition-all duration-300">
      <Link to="/">
        <h1 className="text-text-primary text-2xl font-bold">LuminaBookie</h1>
      </Link>
      <NavMenu>
        {/*Login/Register section */}
        <div
          className={cn(
            "flex flex-col items-center gap-2 md:flex-row",
            "*:border-primary *:rounded-md *:border-2 *:px-2 *:py-2 *:transition-all *:hover:scale-105 *:hover:shadow-2xs md:*:px-4"
          )}
        >
          <NavLink
            to="login"
            className={({ isActive }) =>
              cn((isActive || user) && "hidden", "bg-surface text-primary hover:bg-primary/10")
            }
          >
            Sign in
          </NavLink>

          <NavLink
            to="register"
            className={({ isActive }) =>
              cn((isActive || user) && "hidden", "bg-primary hover:bg-primary-hover text-white")
            }
          >
            Sign up
          </NavLink>
          {user && (
            <HoldButton duration={600} onComplete={logOutFunction}>
              Log out
            </HoldButton>
          )}
        </div>
      </NavMenu>
    </header>
  );
}
