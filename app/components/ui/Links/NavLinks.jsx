import { Link, NavLink } from "react-router";
import { cn } from "@utils/cn";

const navigatePages = import.meta.glob("/app/routes/navRoutes/*.{jsx,tsx}", {
  eager: true,
});

export default function NavigateLinks({ className, showCurrentRoute = true, children }) {
  const paths = Object.keys(navigatePages);

  const links = paths.map((path) => {
    const name = path.split("/").at(-1).split(".").slice(0, -1).join(" ");
    const href = `/${name.toLowerCase().replace(/\s+/g, "-")}`;

    return showCurrentRoute ? (
      <NavLink
        key={path}
        to={href}
        className={({ isActive }) =>
          cn("transition-colors", isActive && "text-text-secondary hover:text-primary")
        }
      >
        {name}
      </NavLink>
    ) : (
      <Link key={path} to={href} className="">
        {name}
      </Link>
    );
  });

  return (
    <nav className={cn(className, "*:text-text-secondary *:hover:text-primary")}>
      {children}
      {links}
    </nav>
  );
}
