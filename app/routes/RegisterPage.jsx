import { Form, Link, useActionData, useFetcher, useNavigation } from "react-router";

import { validateField } from "@utils/auth-validation";

import { cn } from "@utils/cn";

export async function clientAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const existingUser = JSON.parse(localStorage.getItem("user") ?? "null");

  for (const field of ["login", "email", "password"]) {
    const error = validateField(field, data[field], existingUser); // share logic with """USER-SIDE""" just because mock
    if (error) return { error, field };
  }

  localStorage.setItem("user", JSON.stringify({ ...data, isAuth: true })); // oNLY mOCK
  return { success: true };
}

const Field = ({ showError, errorMessage, ...props }) => {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <input
        {...props}
        className={cn(
          "bg-surface text-text-primary placeholder:text-text-muted w-full rounded-lg border px-4 py-2.5 transition-all duration-200 outline-none",
          showError
            ? "border-error focus:ring-error/20 focus:ring-2"
            : "border-border focus:border-accent focus:ring-accent/20 shadow-sm focus:ring-2"
        )}
      />

      <div className="min-h-[20px]">
        {showError && (
          <span className="animate-in fade-in slide-in-from-top-1 text-error block text-xs font-medium">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const actionData = useActionData();
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const isChecking = fetcher.state === "submitting";

  const getFieldError = (fieldName) => {
    if (fetcher.formData?.get("intent") === fieldName) return "Checking...";

    if (fetcher.data?.field === fieldName && fetcher.data?.error) {
      return fetcher.data.error;
    }

    if (fetcher.data?.field === fieldName && fetcher.data?.success) {
      return "";
    }

    if (actionData?.field === fieldName) return actionData.error;

    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return;

    fetcher.submit({ [name]: value, intent: name }, { action: "/api/check-user", method: "post" });
  };
  return (
    <Form method="post">
      <div className="bg-surface-hover flex flex-col items-center gap-4 py-8 shadow-black">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <h1 className="text-text-primary text-4xl font-extrabold tracking-tight">
            Create an <span className="text-accent italic">Account</span>
          </h1>
          <p className="text-text-secondary text-lg font-medium italic opacity-90">
            It’s time to <span className="text-primary">lumie</span> the pages
          </p>
          <div className="bg-accent mt-2 h-1 w-12 rounded-full opacity-50" />
        </div>
        <Field
          name="email"
          type="email"
          placeholder="Email"
          onBlur={handleBlur}
          errorMessage={getFieldError("email")}
          showError={!!getFieldError("email")}
        />

        <Field
          name="login"
          type="text"
          placeholder="Login"
          onBlur={handleBlur}
          errorMessage={getFieldError("login")}
          showError={!!getFieldError("login")}
        />

        <Field
          name="password"
          type="password"
          placeholder="Password"
          errorMessage={getFieldError("password")}
          showError={!!getFieldError("password")}
          className="flex flex-col"
        />

        <button type="submit" disabled={isSubmitting || isChecking} className="btn-primary">
          {isSubmitting ? "Registering..." : isChecking ? "Checking..." : "Create Account"}
        </button>

        {actionData?.success && (
          <p className="text-success">
            Account created! Return to{" "}
            <Link className="text-accent" to="/">
              Home Page
            </Link>{" "}
            ?
          </p>
        )}
      </div>
    </Form>
  );
}
