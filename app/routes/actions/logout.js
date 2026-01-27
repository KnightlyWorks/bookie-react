// routes/actions/logout.js
import { redirect } from "react-router";

export async function clientAction() {
  const rawUser = localStorage.getItem("user");
  if (rawUser) {
    const user = JSON.parse(rawUser);
    localStorage.setItem("user", JSON.stringify({ ...user, isAuth: false }));
  }
  return redirect("/login");
}
