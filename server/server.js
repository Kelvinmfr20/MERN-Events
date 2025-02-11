// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventsRoutes = require('./routes/events');

// Conectamos a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());              // habilitar CORS
app.use(express.json());      // parsear JSON en el body

// Rutas
app.use('/api/events', eventsRoutes);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
