require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API ONLINE');
});

const PORT = process.env.PORT || 3000; // Rota temporária para criar admin
app.get('', async (req, res) => {
  const pool = require('./db');
  const bcrypt = require('bcrypt');
  const email = 'admin@meusite.com';
  const senha = await bcrypt.hash('Admin123!', 10);

  try {
    await pool.query(
      `INSERT INTO users (email, password, role) VALUES ($1, $2, 'admin') ON CONFLICT DO NOTHING`,
      [email, senha]
    );
    res.send(`Admin criado: ${email} / Admin123!`);
  } catch (err) {
    res.send('Erro ao criar admin: ' + err.message);
  }
})// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('API Online'));

// Rota simulada de jogos do dia
app.get('/jogos-do-dia', (req, res) => {
  const jogos = [
    { campeonato: 'Premier League', time1: 'Liverpool', time2: 'Chelsea', favorito: 'Liverpool', perfil: 'Agressivo', gols_media: 2.3, escanteios_media: 8, cartoes_media: 2 },
    { campeonato: 'Premier League', time1: 'Arsenal', time2: 'Manchester City', favorito: 'Manchester City', perfil: 'Controlado', gols_media: 2.5, escanteios_media: 7, cartoes_media: 3 },
  ];
  res.json(jogos);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log('API rodando'));
