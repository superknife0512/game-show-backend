const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  app.set('socketIO', io);
})

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})
app.use('/api', apiRoutes);


http.listen(1205, ()=>{
  console.log('Listening on port 1205')
})