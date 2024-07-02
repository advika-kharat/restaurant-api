const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.getUserByUsername(username);
    if (user) {
      return res.status(401).json({ status: "user already exists" });
    }
    const userId = await userModel.createUser(
      username,
      hashedPassword,
      email,
      role
    );

    res.status(200).json({
      status: "Account successfully created",
      user_id: userId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
      });
    }

    const token = jwt.sign({ id: user.id }, "advikakharat", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "Login successful",
      user_id: user.id,
      access_token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
