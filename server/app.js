const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const notesController = require("./controller/api/notes/notesController");
const graphqlController = require("./controller/graphql/graphqlController");
const indexController = require("./controller/indexController");

const PORT = 3001;
const SHOULD_CONNECT_TO_DB = true;

if (SHOULD_CONNECT_TO_DB) {
  mongoose.connect("mongodb://127.0.0.1:27017/notes", {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexController);

// REST Endpoints:
app.use("/api/notes", notesController);

// GraphQL Endpoint:
app.use("/graphql", graphqlController);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
