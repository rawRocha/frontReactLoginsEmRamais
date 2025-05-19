import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCircle } from 'react-icons/fa';
import { RootState } from '../../store';
import { fetchUnvailableExtensions } from '../../services/extensionService';
import './style.css';

type LoggedUser = {
  id: number;
  username: string;
  password: string;
};

type LastLogin = {
  id: number;
  extensionNumber: string;
  loggedUser: LoggedUser | null;
};

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState<LastLogin | null>(null);

  // Obter dados do usuário do Redux
  const { currentUser, previousUsers } = useSelector(
    (state: RootState) => state.user
  );
  const displayedUser = currentUser || previousUsers[0];
  const { username = '', extension = '' } = displayedUser || {};

  // Buscar dados dos ramais
  useEffect(() => {
    const fetchRamais = async () => {
      try {
        const data = await fetchUnvailableExtensions();
        setLastLogin(data[0]);
      } catch (error) {
        console.error('Failed to fetch extensions:', error);
      }
    };

    fetchRamais();
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const shouldShowUserInfo = username || lastLogin?.loggedUser?.username;
  const displayUsername = username || lastLogin?.loggedUser?.username || '';
  const displayExtension = extension || lastLogin?.extensionNumber || '';

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="logo">
          <Link to="/">Logins em Ramais</Link>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Disponíveis
            </Link>
          </li>
          <li>
            <Link to="/logados" onClick={closeMenu}>
              Ocupados
            </Link>
          </li>
        </ul>

        {shouldShowUserInfo && (
          <div className={`last-user ${isMenuOpen ? 'open' : ''}`}>
            Last login: <strong>{displayUsername}</strong> in extension{' '}
            <strong>{displayExtension}</strong>
            <FaCircle
              color="green"
              size={10}
              style={{ marginLeft: '5px' }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </nav>
  );
};
