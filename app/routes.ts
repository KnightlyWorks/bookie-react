import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("search", "routes/navRoutes/Search.jsx"),

  route("register", "routes/RegisterPage.jsx"),
  route("login", "routes/LoginPage.jsx"),

  route("api/check-user", "routes/actions/check-user.js"),
  route("api/logout", "routes/actions/logout.js"),

  layout("components/layout/AuthLayout.jsx", [
    route("favorites", "routes/navRoutes/Favorites.jsx"),
  ]),

  route("*", "routes/404.jsx"),
] satisfies RouteConfig;
