const validator = require("validator");

const validateUserData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name info is not sufficient...");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email id is not valid, please enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateProfileEdit = (req) => {
  const allowedUpdates = ["firstName", "lastName", "age", "photoUrl", "skills"];

  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedUpdates.includes(key)
  );

  return isUpdateAllowed;
};

module.exports = { validateUserData, validateProfileEdit };
