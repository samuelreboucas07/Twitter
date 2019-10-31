const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Habilitando uso do protocolo webSocket, alem do http comum
const server = require('http').Server(app);
const io = require('socket.io')(server);


// Conectando a banco online
mongoose.connect(
    "mongodb://goweek:goweek123@ds141812.mlab.com:41812/goweek-samuel",
    {
        useNewUrlParser: true
    }
    );

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());

// Importanto arquivo de rotas
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});

// Instalar ORM para mongodb
// Utilizar mlab para o banco de dados
// Utilizando insomnia para controlar as requisições http