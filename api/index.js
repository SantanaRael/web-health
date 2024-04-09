const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Adiciona o middleware CORS para permitir requisições de outros domínios
app.use(cors());

app.get('/', async (req, res) => {
  try {
    // Verifica se a URL foi passada no corpo da requisição
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Especifique a URL no link da API: http://localhost:3000/?url=http://www.example.com ' });
    }

    // Faz a requisição para a URL especificada
    const response = await axios.get(url);
    res.status(response.status).json({ statusCode: response.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
