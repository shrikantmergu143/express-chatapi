const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const WebSocket = require('ws');
const getUserDetails = require("./controllers/user/getUserDetails");
const usersControllers = require("./controllers/users/usersControllers");
const ChannelController = require("./controllers/channels/ChannelController");
// const ChannelController = require("./controllers/users/usersControllers");
const serverStore = require("./serverStore");

const connectedSockets = [];

const registerSocketServer = (server) => {
  const socketServer = new WebSocket.Server({ server });

  socketServer.on('connection', (socket, req) => {
    connectedSockets.push(socket);

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

    socket.on('message', async (message) => {
      // Handle received WebSocket messages
      const parsedMessage = JSON.parse(message);
      await handleChatMessage(parsedMessage, req, socket);
    });

    socket.on('close', () => {
      // Remove the disconnected socket from the list
      const index = connectedSockets.indexOf(socket);
      if (index !== -1) {
        connectedSockets.splice(index, 1);
      }
    });
  });
};

async function handleChatMessage(message, req, socketSent) {
  const messages = {
      ...message,
      // connectUsers: serverStore.getAllConnectedUsers()
  };

  if(req?.user){
    if(!messages.request){
      messages.request = {}
    }
    messages.request.user = req?.user;
  }

  switch (message?.url) {
    case "get_user_details" : {
      if (message?.request?.user_id) {
        const response = await getUserDetails(message.request.user_id);
        messages.response = response;
      }
      break;
    }
    case "send_friend_request" : {
      if (message?.request?.email_to) {
        const response = await usersControllers.controllers.setFriendRequest(message?.request, req);
        messages.response = response;
      }
      break;
    }
    case "add_channels" : {
      if (message?.request?.channel_name) {
        const payload = {
          body: message?.request,
          user: req?.user,
        }
        const response = await ChannelController.controllers.AddChannelsController(payload, req);
        messages.response = response;
      }
      break;
    }
    case "get_channels" : {
        const payload = {
          ...message?.request,
          user: req?.user,
        }
        const response = await ChannelController.controllers.GetChannelsController(payload, req);
        messages.response = response;
      break;
    }
    case "update_friend_request" : {
      const payload = {
        ...message?.request,
        user: req?.user,
      }
      const response = await usersControllers.controllers.setStoreFriendRequest(payload, req);
      messages.response = response;
      break;
    }
    case "get_friend_request" : {
      const payload = {
        ...message?.request,
        user: req?.user,
      }
      const response = await usersControllers.controllers.getFriendRequestList(payload, req);
      messages.response = response;
      break;
    }
    case "get_friend_accepted" : {
      const payload = {
        ...message?.request,
        user: req?.user,
      }
      const response = await usersControllers.controllers.getFriendListAccepted(payload, req);
      messages.response = response;
      break;
    }
    default:
      console.log("Unknown request type");
      break;
  }

  // if (message?.broadcast) {
  //     const allSockets = Array.from(serverStore.connectUsers.keys());
  //     allSockets.forEach(async (socketId) => {
  //         const socket = serverStore.connectUsers.get(socketId);
  //         socket.send(JSON.stringify(messages));
  //     });
  // } else {
  //     socketSent.send(JSON.stringify(messages));
  // }
  if(messages.request.user){
    delete messages.request.user;
  }
  if (message?.broadcast) {
    connectedSockets.forEach(async (socket) => {
      return socket.send(JSON.stringify(messages));
    });
  }else{
    socketSent.send(JSON.stringify(messages));
  }
}

module.exports = {
  registerSocketServer
};
