export const validateField = (name, value, existingUser) => {
  if (name === "login") {
    if (!value || value.length < 3) return "Use at least 3 characters for Login";
    if (existingUser && existingUser.login === value) return "Login is already in use";
  }

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
    if (existingUser && existingUser.email === value) return "This email is already taken";
  }

  if (name === "password") {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,}$/;
    if (!passwordRegex.test(value)) return "Use at least 8 characters with letters and numbers.";
  }

  return null;
};
