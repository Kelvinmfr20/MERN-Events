import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CrearEvento';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero setSearchQuery={setSearchQuery} />
            <EventsSection searchQuery={searchQuery} />
            <Footer />
          </>
        }/>
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/crear-evento" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
