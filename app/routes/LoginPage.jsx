import {
  data,
  Form,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
  useRouteLoaderData,
} from "react-router";

import Field from "@components/ui/Forms/TextField";
import { expiresIn } from "@utils/generateExpairsIn";
import { TOKEN_LIVE_TIME } from "@constants/constants";

export async function clientAction({ request }) {
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  const rawUser = localStorage.getItem("user");
  const existingUser = JSON.parse(rawUser ?? "null");

  if (
    !existingUser ||
    existingUser.login !== submission.login ||
    existingUser.password !== submission.password
  ) {
    return data({ error: "Incorrect login or password" }, { status: 401 });
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ ...existingUser, isAuth: true, expiresAt: expiresIn(TOKEN_LIVE_TIME) })
  );
  return redirect("/");
}

function LoginForm() {
  const actionData = useActionData();
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const isChecking = fetcher.state === "submitting";

  return (
    <Form method="post">
      <div className="bg-surface-hover flex flex-col items-center gap-4 py-8 shadow-black">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <h1 className="text-text-primary text-4xl font-extrabold tracking-tight">
            Login to <span className="text-accent italic">Account</span>
          </h1>
          <div className="bg-accent mt-2 h-1 w-12 rounded-full opacity-50" />
        </div>

        <Field
          name="login"
          type="text"
          placeholder="Login"
          errorMessage={""}
          showError={!!actionData?.error}
        />

        <Field
          name="password"
          type="password"
          placeholder="Password"
          errorMessage={""}
          showError={!!actionData?.error}
        />
        {actionData?.error && (
          <p className="text-error text-sm font-semibold">{actionData?.error}</p>
        )}
        <button type="submit" disabled={isSubmitting || isChecking} className="btn-primary">
          {isSubmitting ? "Logging in..." : isChecking ? "Checking..." : "Login"}
        </button>
      </div>
    </Form>
  );
}

export default function LoginPage() {
  const rootData = useRouteLoaderData("root");
  const user = rootData?.user;

  if (user) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <h1 className="text-text-primary text-4xl font-extrabold tracking-tight">
          You already logged in as <span className="text-accent">{user.login}</span>
        </h1>
        <Form method="post" action="/api/logout">
          <button className="btn-primary hover:bg-error transition-colors">
            Logout from Account
          </button>
        </Form>
      </div>
    );
  }

  return <LoginForm />;
}
