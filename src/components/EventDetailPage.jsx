import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el evento');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Evento no encontrado</h2>;
  }

  return (
    <div className="event-detail-container">
      <div className="event-card">
        <h1 className="event-title">{event.title}</h1>
        
        <img src={event.image} alt={event.title} className="event-image" />

        <div className="event-info">
          <p><strong>📅 Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>📍 Ubicación:</strong> {event.location}</p>
          <p className="event-description">{event.description}</p>
          <p className="tickets"><strong>🎟️ Boletos disponibles:</strong> {event.availableTickets}</p>

          {/* Botón para comprar boletos */}
          {!showForm && (
            <button className="buy-button" onClick={() => setShowForm(true)}>Adquirir Boleto</button>
          )}

          {/* Formulario de compra */}
          {showForm && (
            <form className="purchase-form" onSubmit={(e) => {
              e.preventDefault();
              alert(`Compra exitosa. Se enviará confirmación a ${correo}`);
              setShowForm(false);
              setCantidad("");
              setCorreo("");
            }}>
              <label>Cantidad de boletos:</label>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />

              <label>Correo electrónico:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">Confirmar Compra</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
