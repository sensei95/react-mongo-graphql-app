const express = require("express");
require("dotenv").config();
const cors = require("cors");

const colors = require("colors");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.APP_PORT || 5000;

const connectDB = require("./config/db");

const app = express();

app.use(cors());

// Database connection
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log("App running on port " + port));
