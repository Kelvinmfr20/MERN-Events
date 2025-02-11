import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/img/mask2.png"
          alt="logo"
          className="logo"
        />

        <Link to="/" className="brand-name, lola">
          Events
        </Link>
      </div>

      <nav className="nav">
        <ul>
          <li><Link to="/crear-evento">Crear Evento</Link></li>
          <li><a href="#">Sobre Mi</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

