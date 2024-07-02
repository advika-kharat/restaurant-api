const diningPlaceModel = require("../models/diningPlaceModel");

const checkAvailability = (bookedSlots, startTime, endTime) => {
  for (const slot of bookedSlots) {
    if (
      new Date(slot.start_time) < new Date(endTime) &&
      new Date(slot.end_time) > new Date(startTime)
    ) {
      return false;
    }
  }
  return true;
};

const getNextAvailableSlot = (bookedSlots, endTime) => {
  const sortedSlots = bookedSlots.sort(
    (a, b) => new Date(a.end_time) - new Date(b.end_time)
  );
  for (const slot of sortedSlots) {
    if (new Date(slot.end_time) > new Date(endTime)) {
      return slot.end_time;
    }
  }
  return null;
};

const checkAvailable = async (req, res) => {
  const { place_id, start_time, end_time } = req.body;
  try {
    const diningPlace = await diningPlaceModel.getDiningPlaceById(place_id);

    if (!diningPlace) {
      return res.status(404).json({ status: "Dining place not found" });
    }

    const bookedSlots = JSON.parse(diningPlace.booked_slots);
    const nextAvailableSlot = getNextAvailableSlot(bookedSlots, end_time);

    if (!checkAvailability(bookedSlots, start_time, end_time)) {
      return res.status(200).json({
        place_id: diningPlace.place_id,
        name: diningPlace.name,
        phone_no: diningPlace.phone_no,
        available: false,
        next_available_slot: nextAvailableSlot,
      });
    }

    res.status(200).json({
      place_id: diningPlace.place_id,
      name: diningPlace.name,
      phone_no: diningPlace.phone_no,
      available: true,
      next_available_slot: nextAvailableSlot,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const makeBooking = async (req, res) => {
  const { place_id, start_time, end_time } = req.body;

  try {
    const diningPlace = await diningPlaceModel.getDiningPlaceById(place_id);

    if (!diningPlace) {
      return res.status(404).json({ status: "Dining place not found" });
    }

    const bookedSlots = JSON.parse(diningPlace.booked_slots);

    if (!checkAvailability(bookedSlots, start_time, end_time)) {
      const nextAvailableSlot = getNextAvailableSlot(bookedSlots, end_time);
      return res.status(400).json({
        status: "Time slot not available",
        next_available_slot: nextAvailableSlot,
      });
    }

    bookedSlots.push({ start_time, end_time, place_id });
    await diningPlaceModel.updateBookedSlots(
      place_id,
      JSON.stringify(bookedSlots)
    );

    res.status(201).json({
      status: "Booking successful",
      place_id: place_id,
      start_time: start_time,
      end_time: end_time,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  checkAvailable,
  makeBooking,
};
