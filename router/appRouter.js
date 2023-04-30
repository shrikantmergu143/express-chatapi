const authRoutes = require("./../routes/authRoutes")
const userRoutes = require("./../routes/userRoutes");
const listRoutes = require("./../routes/listRoutes");
const fs = require('fs');

function fileExists(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

const appRouter = (app)=>{
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/list", listRoutes);
    app.get('/storage/*', (req, res) => {
        if (fileExists(__dirname + req?.url)){
          res.sendFile(__dirname + req?.url);
        }else{
          res.send("404 page not found");
        }
    });
}
module.exports = appRouter;