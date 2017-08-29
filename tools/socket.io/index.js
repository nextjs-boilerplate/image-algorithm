
import getSocketIO from 'socket.io'
import run from './run'

module.exports = (app) => {
  const io = getSocketIO(app)
  io.on('connection', function (socket) {
    const send = (type, data) => socket.emit(type, data)
    socket.on('file', ({ cmd, base64, params = [], inputPrifix, outputPrifix }) => {
      run(cmd, base64, params, send, inputPrifix, outputPrifix)
        .then((result) => send('done', result))
        .catch((e) => {
          send('error', e)
        })
    })
  });

}