const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Configuração do Supabase
const supabaseUrl = 'https://xopxbpperktdhzwvqgyu.supabase.co/'; // Substitua pela URL do seu banco de dados Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvcHhicHBlcmt0ZGh6d3ZxZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxODk4MTQsImV4cCI6MTk5OTc2NTgxNH0.8HAV5SpdnDJGZXqmwA0oxIIcaa8oONUDpbtFy9odp4A'; // Substitua pela chave do cliente do seu banco de dados Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota para consultar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para consultar um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('produtos').select('*').eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
