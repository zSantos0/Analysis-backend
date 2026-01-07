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
});
app.listen(PORT, () => console.log('API rodando'));
