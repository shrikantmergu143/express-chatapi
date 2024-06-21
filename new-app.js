const express = require("express");
const https = require("https"); // Change to https
const fs = require("fs");
const cors = require("cors");
const mongoose = require('mongoose');
const socketServer = require('./socketServer');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express();
const appRouter = require("./router/appRouter");

// Load SSL certificates
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Serve static files
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || process.env.API_PORT;
const HOSTNAME = '0.0.0.0';
app.use(fileUpload());
app.use(express.json());
const corsOptions = {
  methods: ['GET', 'POST', 'PUT'],
  origin: "*",
};
app.use(cors(corsOptions));

// Register routes
appRouter(app);

// Create HTTPS server
const server = https.createServer(credentials, app);

// Register socket server
socketServer.registerSocketServer(server);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    server.listen(PORT, HOSTNAME, () => {
        console.log("Server is running on port", PORT);
    });
}).catch(error => console.error(error));
