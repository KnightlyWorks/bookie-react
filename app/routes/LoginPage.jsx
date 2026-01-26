import { data, Form, Link, redirect, useActionData, useFetcher, useNavigation } from "react-router";

import { validateField } from "@utils/auth-validation";
import Field from "@components/ui/Forms/TextField";

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

  const updatedUser = { ...existingUser, isAuth: true };
  localStorage.setItem("user", JSON.stringify(updatedUser));

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
