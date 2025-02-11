const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  availableTickets: { type: Number, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, required: true } // <-- Asegura que está presente
});

// Especificar la colección "events"
module.exports = mongoose.model('Event', eventSchema, 'events');
