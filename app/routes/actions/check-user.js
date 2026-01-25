import { validateField } from "@utils/auth-validation";

export async function clientAction({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const value = formData.get(intent);
  const existingUser = JSON.parse(localStorage.getItem("user") ?? "null");

  const error = validateField(intent, value, existingUser);
  return error ? { error, field: intent } : { success: true, field: intent };
}
