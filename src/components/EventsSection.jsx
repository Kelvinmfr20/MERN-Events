import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EventsSection({ searchQuery }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/events?title=${searchQuery}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener los eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  return (
    <section className="events-section">
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
        Eventos Disponibles
      </h2>

      <div className="events-container" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              key={event._id}
              to={`/event/${event._id}`}
              className="event-card"
              style={{
                textDecoration: 'none',
                color: 'black',
                background: 'white',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                width: '300px'
              }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '10px 10px 0 0',
              }}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '10px' }}>
                {event.title}
              </h3>
              <p style={{ color: 'gray', fontSize: '14px' }}>
                {new Date(event.date).toLocaleString()}
              </p>
              <p style={{ fontSize: '14px' }}>{event.location}</p>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '16px', color: 'gray' }}>No se encontraron eventos</p>
        )}
      </div>
    </section>
  );
}

export default EventsSection;
