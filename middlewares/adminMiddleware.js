const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ status: "Unauthorized", status_code: 401 });

  try {
    const decoded = jwt.verify(token, "advikakharat");
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ? AND role = ?",
      [decoded.id, "admin"]
    );

    if (!rows[0]) {
      return res.status(403).json({ status: "Forbidden", status_code: 403 });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    res.status(401).json({ status: "Invalid token", status_code: 401 });
  }
};

module.exports = adminMiddleware;
