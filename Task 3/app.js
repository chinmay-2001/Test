const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./Routes/studentRoutes");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/students", studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
