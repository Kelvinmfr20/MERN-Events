require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event'); // Asegúrate de que el modelo está bien importado

// Conectar a MongoDB con la URI del archivo .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Datos de los eventos con imágenes
const eventos = [
  {
    title: "3v3 Basketball Tournament",
    location: "Cancha 11 - Centro Olimpico",
    date: new Date("2025-03-01T20:00:00.000Z"),
    availableTickets: 50,
    description: "Reúne a tu equipo, demuestra tus habilidades y compite en el torneo definitivo de basketball 3v3.",
    image: "/img/cancha.jpg"
  },
  {
    title: "Curso de Cocina",
    location: "Instituto Culinario Dominicano",
    date: new Date("2025-05-09T12:00:00.000Z"),
    availableTickets: 30,
    description: "Aprende técnicas avanzadas de cocina con chefs expertos.",
    image: "/img/cocina.jpg"
  },
  {
    title: "Food Challenge: Eat It All!",
    location: "El Chino Hamburguesas",
    date: new Date("2025-02-09T17:00:00.000Z"),
    availableTickets: 20,
    description: "Reto gastronómico: termina la hamburguesa gigante en menos de 10 minutos y gana premios.",
    image: "/img/competencia.jpg"
  },
  {
    title: "Luxury Cars Expo",
    location: "Autódromo Las Américas",
    date: new Date("2025-02-10T13:00:00.000Z"),
    availableTickets: 200,
    description: "Exhibición de los autos más lujosos y deportivos del mundo.",
    image: "/img/carros.jpg"
  },
  {
    title: "Concierto de Metal",
    location: "Lungomare Del Malecon - Distrito Nacional",
    date: new Date("2025-02-10T23:00:00.000Z"),
    availableTickets: 100,
    description: "Una experiencia brutal llena de energía, riffs pesados y pasión por el metal.",
    image: "/img/metalica.webp"
  }
];

// Insertar eventos en MongoDB
Event.insertMany(eventos)
  .then(() => {
    console.log("✅ Eventos insertados correctamente");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error al insertar eventos:', err);
    mongoose.connection.close();
  });
