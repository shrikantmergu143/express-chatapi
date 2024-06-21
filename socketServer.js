const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const getUserDetails = require("./controllers/user/getUserDetails");
const getUser = require("./controllers/auth/getUser");

const connectedSockets = [];

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({ server });

  socketServer.on('connection', (socket, req) => {
    connectedSockets.push(socket);
    socket.on('message', (req, res) => {
      // Handle received WebSocket messages
      const message = JSON.parse(req);
      handleChatMessage(message, req, res);
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

async function handleChatMessage(message, req, res) {
  connectedSockets.forEach(async (socket) => {
    const messages = {
      ...message,
    };
    if(message?.url === "get_user_details" && message?.request?.user_id){

      req.user = {
        user_id: message?.request?.user_id
      }
      const response = await getUserDetails(message?.request?.user_id, res);
      messages.response = response;
      return socket.send(JSON.stringify(messages));
    }else{
      const response = {
        type: 'chat',
        text: 'Your message was received and processed.',
        url: message?.url,
        // connectedSockets: connectedSockets
      };
      socket.send(JSON.stringify(response));
    }

  });
}

module.exports = {
  registerSocketServer
};
