let playerData = []; // username, socketId, img, score

let answers = []; // username, answer: number

exports.testController = (req,res) => {
  console.log('Testing...');
  if (req) {
    res.json({
      name: 'Test'
    })
  }
}

exports.addPlayer = (req, res) => {
  const socket = req.app.get('socketIO');
  const existedPlayer = playerData.find(ele => ele.username === req.body.username);
  if (existedPlayer) {
    existedPlayer.socketId = req.body.socketId;
    existedPlayer.img = req.body.img;
    existedPlayer.score = req.body.score;
    console.log('Update player info');
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