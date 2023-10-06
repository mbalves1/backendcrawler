const mongoose = require("mongoose");
require('dotenv').config();

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;