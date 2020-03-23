import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import io from 'socket.io-client';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

import './styles.css';

export default function Main() {
  const { id: userId } = useParams();

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('devs', {
        headers: { user: userId },
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [userId]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: userId },
    });

    socket.on('match', dev => setMatchDev(dev));
  }, [userId, users]);

  async function handleLike(id) {
    await api.post(`devs/${id}/likes`, null, {
      headers: { user: userId },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`devs/${id}/likes`, null, {
      headers: { user: userId },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <main className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />

              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>

                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match!" />
          <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            Fechar
          </button>
        </div>
      )}
    </main>
  );
}
