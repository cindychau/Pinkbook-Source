// Import Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
// const bodyParser = require("body-parser");

// require('dotenv').config();

const apiRouter = require("./Routes/api");

// Invoke modules
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());

// Parse HTTP Message and place Body within req.body
app.use(express.json());
app.use(express.urlencoded());

// Basic Flow Test
app.use((req, res, next) => {
  console.log(`
    ****** FLOW TEST ******
    METHOD: ${req.method}
    PATH: ${req.path}
  `);
  return next();
});

// Hosting static files
app.use("/build", express.static(path.join(__dirname, "../build")));

//sending backing requests to router
app.use("/api", apiRouter);

// Send homepage - Optional?
app.get("/*", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// Route to handle 404 errors
app.use((req, res) => {
  res.status(404).send("Sorry can't find the webpage your looking for");
});

// Error hander
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!'", err);
});

// Listener
app.listen(port, () => {
  console.log(`Port is listening to ${port}`);
});
