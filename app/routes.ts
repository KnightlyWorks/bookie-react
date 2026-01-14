import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("search", "routes/SearchPage.jsx"), route("favorite", "routes/Favorites.jsx"), route("*", "routes/404.jsx"),] satisfies RouteConfig;
