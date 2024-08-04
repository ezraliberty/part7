require("dotenv").config();

const PORT = process.env.PORT;
const DATABASE =
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_TEST
    : process.env.DATABASE;

module.exports = {
  PORT,
  DATABASE,
};
