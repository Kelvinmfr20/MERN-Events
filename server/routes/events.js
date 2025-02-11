// server/routes/events.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Event = require('../models/Event');

// POST /api/events - Crear un evento
router.post('/', async (req, res) => {
    try {
      const { title, location, date, availableTickets, description, email, phone } = req.body;
  
      // Configurar Nodemailer para enviar el correo
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Correo emisor
          pass: process.env.EMAIL_PASS, // Contraseña de aplicación
        },
      });
  
      const mailOptions = {
        from: `"Eventos Notificación" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL, // Correo del administrador donde llegarán los datos
        subject: 'Nuevo Evento Solicitado',
        text: `
          🚀 Se ha recibido una nueva solicitud de evento.
  
          📌 *Título:* ${title}
          📍 *Ubicación:* ${location}
          📅 *Fecha:* ${new Date(date).toLocaleString()}
          🎟️ *Boletos Disponibles:* ${availableTickets}
          📝 *Descripción:* ${description}
  
          📧 *Correo del organizador:* ${email}
          📞 *Teléfono del organizador:* ${phone}
  
          🔍 Recuerda que este evento **no se ha guardado automáticamente**, revísalo y créalo manualmente en la base de datos.
        `,
      };
  
      // Enviar correo
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('❌ Error al enviar correo:', err);
          return res.status(500).json({ message: 'Error al enviar el correo' });
        } else {
          console.log('✅ Correo enviado:', info.response);
          return res.status(200).json({ message: 'Solicitud enviada correctamente' });
        }
      });
  
    } catch (error) {
      console.error('❌ Error al procesar la solicitud:', error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  });

// GET /api/events?title=... - Obtener eventos (o buscar por título)
router.get('/', async (req, res) => {
    try {
      const { title } = req.query;
  
      let query = {};
      if (title) {
        query.title = { $regex: title, $options: 'i' }; // Búsqueda insensible a mayúsculas y minúsculas
      }
  
      const events = await Event.find(query);
      res.json(events);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      res.status(500).json({ message: 'Error al obtener eventos' });
    }
  });

// GET /api/events/:id - Obtiene un solo evento por su ID
router.get('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }
      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el evento' });
    }
});
  

// POST /api/events/:id/purchase - comprar boletos y mandar correo
router.post('/:id/purchase', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { email, quantity } = req.body;

    // Encontrar el evento
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    // Revisar la cantidad de boletos
    if (event.availableTickets < quantity) {
      return res.status(400).json({ 
        message: `Solo hay ${event.availableTickets} boletos disponibles` 
      });
    }

    // Actualizar boletos disponibles
    event.availableTickets -= quantity;
    await event.save();

    // Enviar correo con nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Eventos" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Compra de boletos',
      text: `Has comprado ${quantity} boletos para: ${event.title}\nLugar: ${event.location}\nFecha: ${event.date}\n¡Gracias por tu compra!`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error al enviar correo:', err);
      } else {
        console.log('Correo enviado:', info.response);
      }
    });

    res.json({
      message: 'Compra realizada con éxito',
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al comprar boletos' });
  }
});

module.exports = router;
