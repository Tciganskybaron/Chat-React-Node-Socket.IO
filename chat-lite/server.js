/* eslint-disable react-hooks/rules-of-hooks */
const { log } = require('console');
const express = require('express');

const morgan = require('morgan');

const app = express(); 
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


app.use(morgan('dev'));
app.use(express.json());


const rooms = new Map();

app.get('/rooms', (req,res) => {
  rooms.set('hello', 'world');
  res.json(rooms)
})

app.post('/rooms', (req,res) => {
console.log(req.body);
const { roomId, userName } = req.body;
if (!rooms.has(roomId)) { 
  rooms.set(roomId, new Map([
    ['users', new Map()],
    ['messages', []],
  ]));
}
res.send();
})

io.on('connection', socket => {
  socket.on('ROOM:JOIN', (data) => {
    console.log(data);
  });
  console.log("Socket connection", socket.id);
})

server.listen(9999 , async (err) => {
  if (err) { 
    throw Error(err); 
  }
  console.log('Веб-сервер слушает порт', 9999) 
  // try {
  //   await sequelize.authenticate();
  //   console.log('БД-сервер подключен успешно');
  // } catch (error) {
  //   console.log('БД-сервер не подключен');
  //   console.log(error.message);
  // }
});
