const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Add this line
const app = express();
const port = 3006;
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Permitir todas as origens
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:5173', // permitir apenas solicitações de http://localhost:5173
};

app.use(cors(corsOptions));

// Configurações do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Haitou100*5%',
  database: 'GuildSystem'
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Middleware para parsing de JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Guild DeathChasesYoou System!');
});

// Rota para listar membros da guild
app.get('/members', (req, res) => {
  db.query('SELECT * FROM Players', (err, results) => {
    if (err) {
      console.error('Erro ao listar membros da guild:', err);
      res.status(500).send('Erro ao listar membros da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar membros novos da guild
app.get('/information/newmembers', (req, res) => {
  db.query('SELECT * FROM Players ORDER BY date_joining DESC LIMIT 10', (err, results) => {
    if (err) {
      console.error('Erro ao listar membros novos da guild:', err);
      res.status(500).send('Erro ao listar membros novos da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar status da guild
app.get('/information/status', (req, res) => {
  db.query('SELECT * FROM Guild', (err, results) => {
    if (err) {
      console.error('Erro ao listar status da guild:', err);
      res.status(500).send('Erro ao listar status da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar history
app.get('/history', (req, res) => {
  db.query('SELECT history FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar história da guild:', err);
      res.status(500).send('Erro ao listar história da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar mensagem de boas-vindas
app.get('/information/welcome', (req, res) => {
  db.query('SELECT welcome FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar mensagem da guild:', err);
      res.status(500).send('Erro ao listar mensagem da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar conquistas da guild
app.get('/awards', (req, res) => {
  db.query('SELECT awards FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar conquistas da guild:', err);
      res.status(500).send('Erro ao listar conquistas da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar notícias da guild
app.get('/information/news', (req, res) => {
  db.query('SELECT * FROM News where guild_id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar notícias da guild:', err);
      res.status(500).send('Erro ao listar notícias da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para adicionar novo membro da guild
app.post('/newmember', (req, res) => {
  console.log(req.body)
  const { name, classe, race, tier, specialization, image, ranking, note } = req.body;

  if (!name || !classe || !race || !tier || !specialization) {
    return res.status(400).send('Campos obrigatórios estão faltando');
  }

  db.query(
    'INSERT INTO Players (name, class, race, tier, specialization, image, ranking, note, guild_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)',
    [name, classe, race, tier, specialization, image, ranking, note],
    (err, result) => {
      if (err) {
        console.error('Erro ao registrar novo membro:', err);
        return res.status(500).send('Erro ao registrar novo membro');
      }
      res.status(201).send('Membro registrado com sucesso');
    }
  );
});

// Rota para deletar membro da guilda
app.delete('/newmember', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Nome do membro é obrigatório para exclusão');
  }

  db.query('DELETE FROM Players WHERE name = ?', [name], (err, result) => {
    if (err) {
      console.error('Erro ao deletar membro:', err);
      return res.status(500).send('Erro ao deletar membro'); // Garante que a resposta finaliza aqui em caso de erro
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Membro não encontrado'); // Garante que a resposta finaliza aqui
    }

    return res.status(200).send('Membro deletado com sucesso'); // Garante que a resposta finaliza aqui
  });
});



// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  // Verificação de dados
  if (!user_name || !user_email || !user_password) {
    console.error('Dados faltando:', { user_name, user_email, user_password });
    res.status(400).send('Todos os campos são obrigatórios');
    return;
  }

  // Hash da senha antes de salvar no banco de dados
  bcrypt.hash(user_password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erro ao hash da senha:', err);
      res.status(500).send('Erro ao registrar usuário');
      return;
    }

    // Inserir o usuário no banco de dados
    db.query('INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)', [user_name, user_email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).send('Erro ao registrar usuário');
        return;
      }
      res.status(201).send('Usuário registrado com sucesso');
    });
  });
});


// ======================================================================

// Chave secreta para assinar o token
const SECRET_KEY = 'Haitou';

// Rota para login de usuário
app.post('/login', (req, res) => {
  const { user_email, user_password } = req.body;

  // Verificar se o usuário existe
  db.query('SELECT * FROM users WHERE user_email = ?', [user_email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).send('Erro ao fazer login');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado');
      return;
    }

    const user = results[0];

    // Verificar a senha
    bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senha:', err);
        res.status(500).send('Erro ao fazer login');
        return;
      }

      if (!isMatch) {
        res.status(401).send('Senha incorreta');
        return;
      }

      // Gerar um token JWT
      const token = jwt.sign({ id: user.id_user, email: user.user_email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});



// ======================================================================

// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Acesso negado');
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }

    req.user = user;
    next();
  });
}

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.send('Esta é uma rota protegida');
});

// ======================================================================

// Rota para requisição de informação do usuário logado
app.get('/users', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT user_name, user_email, id_user, user_image FROM users WHERE id_user = ?', [userId], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        // Retornando os campos nome, email e id
        res.json({ 
          user_name: results[0].user_name,
          user_email: results[0].user_email,
          id_user: results[0].id_user,
          user_image: results[0].user_image
        });
      } else {
          res.sendStatus(404);
      }
  });
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
