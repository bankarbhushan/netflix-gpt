export const checkValidData = (email, password, userName) => {
  const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const isUserNameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(userName);

  if (!isEmailValid)
    return "This email address is not valid, enter a valid email address";

  if (!isPasswordValid)
    return `Incorrect password for ${email}. You can use a sign-in code, reset your password, or try again.`;

  if (!isUserNameValid) return `Sorry! User not found with email ${email}`;

  // When all validations pass, return null.
  return null;
};
