// const registerSocketServer = (server) =>{
//   const io = require("socket.io")(server, {
//     cors:{
//       origin:"*",
//       methods:["GET", "POST"],
//     },
//   });
//   io.on("connection", (socket)=>{
//     console.log("user connected");
//     console.log("socket.id", socket.id);
//   })
// }
const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");

const WebSocket = require('ws');
const connectedSockets = [];

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({server});

  socketServer.on('connection', (socket, req) => {
    connectedSockets.push(socket);
    socket.on('message', (req) => {
      // 'message' contains the received WebSocket message
      // const message = JSON.parse(req);
      // console.log('Received message:', message);
      // switch (message?.type) {
      //   case 'chat':
      //     // Handle chat messages
      //     handleChatMessage(message);
      //   break;
      //   default:
      //     // Handle unknown message types or errors
      //     handleChatMessage(message);
      // }
    });
    // Verify client connection token id is valid or not
    const response = authSocket.validateToken(socket, req);
    // Handle disconnection
    if(response !== "NOT_AUTHORIZED"){
      // console.log("socket", socketServer, socket.id)
      newConnectionHandler(req.user);
      // authentication successfull
      socket.send(JSON.stringify({userDetails:req.user, messages:"web socket connected successfully"}));
    }else{
      // invalid token comming from user
      socket.close();
    }
    console.log("server.clients", socketServer.clients)
    socket.on('close', () => {
      // Remove the disconnected socket from the list
      const index = connectedSockets.indexOf(socket);
      if (index !== -1) {
        connectedSockets.splice(index, 1);
      }
    });

   
  });

}
function handleChatMessage(message) {
  connectedSockets.forEach((socket) => {
    const response = {
      type: 'chat',
      text: 'Your message was received and processed.',
    };
    socket.send(JSON.stringify(response));
  })
}

module.exports = {
  registerSocketServer
}