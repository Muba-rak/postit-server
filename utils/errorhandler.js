const handleErrorUser = (err) => {
  let errors = { email: "", username: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email adrress is already in use";
    return errors;
  }

  if (err.message === "Incorrect Email") {
    errors.email = "This email has not been registered";
    return errors;
  }

  if (err.message === "Incorrect Password") {
    errors.email = "This email or password is not correct";
    errors.password = "This email or password is not correct";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const handleErrorPost = (err) => {
  let errors = { title: "", tags: "", description: "" };
  if (err.code === 11000) {
    errors.title = "This post title is already in use";
    return errors;
  }

  if (err.message.includes("Post validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = { handleErrorPost, handleErrorUser };
