const express = require("express");
const http = require("http");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const usersRoutes = require("./routes/usersRoutes");
const mongoose = require('mongoose');
const socketServer = require('./socketServer')
require('dotenv').config();
const fileUpload = require('express-fileupload');


const PORT = process.env.PORT || process.env.API_PORT;
const HOSTNAME = '0.0.0.0'
const app = express();
app.use(fileUpload());
app.use(express.static('public'));
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
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", usersRoutes);

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

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGO_URL, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         // await client.db("admin").command({ ping: 1 });
//         server.listen(PORT, ()=>{
//             console.log("Serverport", PORT);
//         });
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.error);