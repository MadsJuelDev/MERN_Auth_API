const express = require("express");
const mongoose = require("mongoose");
const app = express();

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//import product routes
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();
const PORT = process.env.PORT || 4000;
// Is Server running?
app.listen(PORT, function () {
  console.log("The Server is running on port: " + PORT);
});

//Parse request as JSON
app.use(express.json());

//routes (get,post,put,delete (CRUD))
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the MERN AUTH API" });
});
app.use("/api/user", authRoutes);

// app.get("/api/user/logout", (req, res) => {
//   res.clearCookie("auth-token", { path: "/Creator" });
//   res.status(200).send("Logged Out Succesfully");
// });

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDB")
);

module.exports = app;
