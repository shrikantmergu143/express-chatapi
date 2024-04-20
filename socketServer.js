const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

const connectedSockets = [];

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({ server });

  socketServer.on('connection', (socket, req) => {
    connectedSockets.push(socket);
    socket.on('message', (req) => {
      // Handle received WebSocket messages
      // const message = JSON.parse(req);
      // handleChatMessage(message);
    });

    // Verify client connection token id is valid or not
    const response = authSocket.validateToken(socket, req);
    if (response !== "NOT_AUTHORIZED") {
      newConnectionHandler(req.user);
      // Authentication successful
      socket.send(JSON.stringify({ userDetails: req.user, messages: "WebSocket connected successfully" }));
    } else {
      // Invalid token coming from user
      socket.close();
    }

    socket.on('close', () => {
      // Remove the disconnected socket from the list
      const index = connectedSockets.indexOf(socket);
      if (index !== -1) {
        connectedSockets.splice(index, 1);
      }
    });
  });
};

function handleChatMessage(message) {
  connectedSockets.forEach((socket) => {
    const response = {
      type: 'chat',
      text: 'Your message was received and processed.',
    };
    socket.send(JSON.stringify(response));
  });
}

module.exports = {
  registerSocketServer
};
