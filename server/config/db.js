// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectado', mongoose.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1); // detener el proceso si falla la conexión
  }
};

module.exports = connectDB;
