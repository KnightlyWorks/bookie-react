import { Outlet, redirect } from "react-router";

export async function clientLoader() {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const isExpired = user?.expiresAt && Date.now() > user.expiresAt;

  if (!user || !user.isAuth || isExpired) {
    localStorage.removeItem("user");
    throw redirect("/login");
  }

  return { user };
}

export default function AuthLayout() {
  return <Outlet />;
}
