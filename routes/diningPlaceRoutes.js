const express = require("express");
const router = express.Router();
const diningPlaceController = require("../controllers/diningPlaceController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/dining-place/create",
  adminMiddleware,
  diningPlaceController.addNewDiningPlace
);

router.get(
  "/dining-place/all-places",
  authMiddleware,
  diningPlaceController.getAllDiningPlaces
);

router.get(
  "/dining-place",
  authMiddleware,
  diningPlaceController.searchedPlaces
);
module.exports = router;
