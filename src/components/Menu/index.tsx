import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { FaCircle } from 'react-icons/fa';
import { fetchUnvailableExtensions } from '../../services/extensionService';

type LastLogin = {
  id: number;
  extensionNumber: string;
  loggedUser: {
    id: number;
    username: string;
    password: string;
  } | null;
};

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState<LastLogin | null>(null);

  //fetch de ramais
  const fetchRamais = async () => {
    try {
      const data = await fetchUnvailableExtensions();
      setLastLogin(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const { username, extension } = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchRamais();
  }, []);

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="logo">
          <Link to="/">Logins em Ramais</Link>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Disponíveis
            </Link>
          </li>
          <li>
            <Link to="/logados" onClick={toggleMenu}>
              Ocupados
            </Link>
          </li>
        </ul>

        {username || lastLogin?.loggedUser?.username ? (
          <div className={`last-user ${isOpen ? 'open' : ''}`}>
            Last login:{' '}
            <strong>{username || lastLogin?.loggedUser?.username}</strong> in
            extension <strong>{extension || lastLogin?.extensionNumber}</strong>
            <FaCircle color="green" size={10} style={{ marginLeft: '5px' }} />
          </div>
        ) : null}
      </div>
    </nav>
  );
};
