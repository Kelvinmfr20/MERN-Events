import React, { useState } from 'react';

function Hero({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <section className="hero-section" style={{
      backgroundImage: "url('/img/fiesta.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "50px 20px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: "bold" }}>Busca tu evento</h1>
      <form onSubmit={handleSearch} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Buscar evento..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px"
          }}
        />
        <button type="submit" style={{
          marginLeft: "10px",
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Buscar
        </button>
      </form>
    </section>
  );
}

export default Hero;

