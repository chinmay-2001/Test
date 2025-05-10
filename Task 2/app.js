const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./Routes/studentRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/students", studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
