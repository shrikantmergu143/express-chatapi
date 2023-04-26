const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Set up WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for custom event 'message' from client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Listen for disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start Express.js server
http.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
