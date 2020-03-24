let playerData = []; // username, socketId, img, score

let answers = []; // username, answer: number

exports.reSignIn = (req, res) => { // req body.username, body.socketId
  const socket = req.app.get('socketIO');
  const username = req.body.username;
  const existedPlayer = playerData.find(ele => ele.username === username);
  if (existedPlayer) {
    existedPlayer.socketId = req.body.socketId;
    socket.emit('globalAddPlayer', [...playerData])
    res.status(200).json({score: existedPlayer.score})
  } else {
    res.status(301).json({msg: 'This user doesn \'t exist yet'});
  } 
}

exports.addPlayer = (req, res) => {
  const socket = req.app.get('socketIO');
  const existedPlayer = playerData.find(ele => ele.username === req.body.username);
  if (existedPlayer) {
    existedPlayer.socketId = req.body.socketId;
    existedPlayer.img = req.body.img;
    existedPlayer.score = req.body.score;
  } else {
    playerData.push({
      ...req.body,
    });
  }
  socket.emit('globalAddPlayer', [...playerData])
  res.status(200).json({msg: 'done'})
}

exports.sendAnswer = (req,res) => {
  const socket = req.app.get('socketIO'); 
  answers.push({
    ...req.body, // name, socketId
  })
  socket.emit('submitAnswer', [...answers]);
  if (answers.length === playerData.length) {
    socket.emit('allAnswersSubmitted');
    answers = [];
  }
  res.status(200).json({msg: 'done'})
}

exports.questionState = (req,res) => {
  const socket = req.app.get('socketIO'); 
  const state = req.body.state;
  socket.emit('questionState', state);
  res.status(200).json({msg: 'done'})
}

exports.getOldData = (req,res) => {
  res.status(200).json({
    playerData,
  })
}

exports.updateScore = (req,res) => {
  const socket = req.app.get('socketIO'); 
  playerData = [...req.body.allPlayers];
  playerData.forEach(ele => {
    socket.to(ele.socketId).emit('updateEachPlayer', ele.score);
  })
  res.status(200).json({msg: 'done'})
}

exports.timeUp = (req, res) => {
  const socket = req.app.get('socketIO'); 
  playerData.forEach(player =>{
    const existedAnswer = answers.find(ele => {
      ele.username === player.username
    })
    if (!existedAnswer) {
      answers.push({
        username: player.username,
        answer: 1,
      })
    }
  })
  socket.emit('submitAnswer', [...answers]);
  socket.emit('allAnswersSubmitted');
  answers = [];
  res.json({msg: 'OK'});
}

exports.resetGame = (req, res) => {
  answers = [];
  playerData = [];
  res.status(200).json({msg: 'OK'})
}