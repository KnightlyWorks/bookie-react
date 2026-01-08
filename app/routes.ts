import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("search", "routes/SearchPage.jsx"), route("*", "routes/404.jsx"),] satisfies RouteConfig;
