const cloudinary = require('cloudinary').v2;
const express = require("express");
const http = require("http");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require('mongoose');
const socketServer = require('./socketServer')
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express();
const appRouter = require("./router/appRouter")
// Serve static files
app.use(express.static(__dirname + '/public'));

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRETE,
});

const PORT = process.env.PORT || process.env.API_PORT;
const HOSTNAME = '0.0.0.0'
// app.use(fileUpload());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(express.json());
const corsOptions = {
  methods: ['GET', 'POST', 'PUT'],
  origin:"*",
};
app.use(cors(corsOptions));
// app.use("/", (req, res) => {
//   res.json({ message: "Hello From Express App" });
// });
//Register
appRouter(app);
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// Define a route to serve the image file


const server = http.createServer(app, (req, res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end();
});
socketServer.registerSocketServer(server);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    server.listen(PORT, HOSTNAME, ()=>{
        console.log("Serverport", PORT);
    });
}).catch(error => console.error(error));
