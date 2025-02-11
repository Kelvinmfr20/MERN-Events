import React, { useState } from 'react';
import Footer from './Footer';

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEvent = {
      title,
      location,
      date,
      availableTickets,
      description,
      email,
      phone
    };

    try {
      const response = await fetch('http://localhost:4000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert('Error al enviar el formulario: ' + errData.message);
        return;
      }

      alert('Evento enviado correctamente. Recargando página...');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error(error);
      alert('Hubo un problema al enviar la solicitud');
    }
  };

  return (
    <>
      <div className="main-content"> {/* Contenedor principal para empujar el footer */}
        <div className="create-event-container">
          <h2>Crear Evento</h2>
          <form className="create-event-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="location">Lugar:</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="date">Fecha:</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="availableTickets">Cantidad de boletos:</label>
              <input type="number" id="availableTickets" value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número de teléfono:</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <button type="submit" className="btn-submit">Crear Evento</button>
          </form>
        </div>
      </div>

      {/* Footer siempre en la parte inferior */}
      <Footer />
    </>
  );
}

export default CreateEventPage;
