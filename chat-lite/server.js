/* eslint-disable react-hooks/rules-of-hooks */
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

const rooms = new Map();

app.get('/', (req,res) => {
  rooms.set('hello', 'world');
  res.json(rooms)
})
io.on('connection', socket => {
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
