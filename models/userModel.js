const pool = require("../config/database");

const createUser = async (username, password, email, role = "user") => {
  const [result] = await pool.query(
    "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, password, email, role]
  );
  return result.insertId;
};

const getUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByUsername,
};
