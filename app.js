const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const diningPlaceRoutes = require("./routes/diningPlaceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", diningPlaceRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is up and runnning on port ${PORT}`);
});
