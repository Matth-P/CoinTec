import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Estilos da Navbar

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ backgroundColor: 'black' }}> {/* Fundo preto */}
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link
            to="/dashboard"
            className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/progresso"
            className={`navbar-link ${location.pathname === '/progresso' ? 'active' : ''}`}
          >
            Progresso
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/carteira"
            className={`navbar-link ${location.pathname === '/carteira' ? 'active' : ''}`}
          >
            Carteira
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/renda"
            className={`navbar-link ${location.pathname === '/renda' ? 'active' : ''}`}
          >
            Renda
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/perfil"
            className={`navbar-link ${location.pathname === '/perfil' ? 'active' : ''}`}
          >
            Perfil
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;