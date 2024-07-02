const pool = require("../config/database");

const createDiningPlace = async (
  name,
  address,
  phone_no,
  website,
  operational_hours,
  booked_slots
) => {
  const [result] = await pool.query(
    "INSERT INTO dining_places (name, address, phone_no, website, operational_hours, booked_slots) VALUES (?, ?, ?, ?, ?, ?)",
    [
      name,
      address,
      phone_no,
      website,
      JSON.stringify(operational_hours),
      JSON.stringify([]),
    ]
  );
  return result.insertId;
};

const getAllDiningPlaces = async () => {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM dining_places
      `
  );
  return rows;
};

const getDiningPlaceById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM dining_places
    WHERE id = ?`,
    [id]
  );
  return rows[0];
};

const searchDiningPlaces = async (search_query) => {
  const [rows] = await pool.query(
    "SELECT * FROM dining_places WHERE name LIKE ?",
    [`%${search_query}%`]
  );
  return rows;
};

const updateBookedSlots = async (id, booked_slots) => {
  await pool.query("UPDATE dining_places SET booked_slots = ? WHERE id = ?", [
    booked_slots,
    id,
  ]);
};

module.exports = {
  createDiningPlace,
  getAllDiningPlaces,
  getDiningPlaceById,
  updateBookedSlots,
  searchDiningPlaces,
};
