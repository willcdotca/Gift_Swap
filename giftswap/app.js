const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1337 });

function heartbeat() {
  this.isAlive = true;
  console.log('on')
}

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  console.log('connected')
  ws.onclose = function()
  {
    // websocket is closed.
    console.log("Connection is closed...");
  };
  ws.on('message', function incoming(data) {

    ws.send(data)
  });
  ws.on('error', function(err) {
    console.log(err)
  })
});


const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 30000);
