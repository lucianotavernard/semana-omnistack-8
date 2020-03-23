import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('devs', { username });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
