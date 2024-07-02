const diningPlaceModel = require("../models/diningPlaceModel");

const addNewDiningPlace = async (req, res) => {
  const { name, address, phone_no, website, operational_hours, booked_slots } =
    req.body;
  try {
    const diningPlaceId = await diningPlaceModel.createDiningPlace(
      name,
      address,
      phone_no,
      website,
      operational_hours,
      booked_slots
    );
    res
      .status(200)
      .json({ message: `${name} added successfully`, place_id: diningPlaceId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDiningPlaces = async (req, res) => {
  try {
    const fetchDiningPlaces = await diningPlaceModel.getAllDiningPlaces();
    console.log(fetchDiningPlaces);
    const diningPlaces = fetchDiningPlaces.map((row) => ({
      name: row.name,
      address: row.address,
      phone_no: row.phone_no,
      website: row.website,
    }));
    res.json(diningPlaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchedPlaces = async (req, res) => {
  const { name } = req.query;
  try {
    const fetchSearchedPlaces = await diningPlaceModel.searchDiningPlaces(name);
    const diningPlaces = fetchSearchedPlaces.map((row) => ({
      name: row.name,
      address: row.address,
      phone_no: row.phone_no,
      website: row.website,
      operational_hours: row.operational_hours,
      booked_slots: row.booked_slots,
    }));
    res.json(diningPlaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewDiningPlace,
  getAllDiningPlaces,
  searchedPlaces,
};
