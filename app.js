require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`[MongoDB]: Connected to database successfully`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Server listening on port ${PORT}`);
});
