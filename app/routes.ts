import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("search", "routes/SearchPage.jsx"),
  route("favorite", "routes/Favorites.jsx"),
  route("register", "routes/RegisterPage.jsx"),
  route("/api/check-user", "routes/actions/check-user.js"),
  route("*", "routes/404.jsx"),
] satisfies RouteConfig;
