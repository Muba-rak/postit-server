const User = require("../models/user");
const { handleErrorUser } = require("../utils/errorhandler");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ ...req.body });
    return res.status(201).json({ success: true, user });
  } catch (error) {
    const errors = handleErrorUser(error);
    res.status(404).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({
      success: false,
      msg: "Provide the neccessary details",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Incorrect Email");
    }
    const auth = await user.comparePassword(password);
    if (!auth) {
      throw Error("Incorrect Password");
    }
    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    const errors = handleErrorUser(error);
    res.status(404).json({ errors });
  }
};



module.exports = { register, login };
