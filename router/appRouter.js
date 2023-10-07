const authRoutes = require("./../routes/authRoutes")
const userRoutes = require("./../routes/userRoutes");
const usersRoutes = require("./../routes/usersRoutes");
const listRoutes = require("./../routes/listRoutes");
const messageRoutes = require("./../routes/messageRoutes");
const groupRoutes = require("./../routes/groupRoutes");
const fs = require('fs');
const App_url = require("../constant/App_url");

function fileExists(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

const appRouter = (app)=>{
    app.use(App_url.api_auth, authRoutes);
    app.use(App_url.api_user, userRoutes);
    app.use(App_url.api_list, listRoutes);
    app.use(App_url.api_message, messageRoutes);
    app.use(App_url.api_friend, usersRoutes);
    app.use(App_url.api_group, groupRoutes);
    app.get(App_url.storage, (req, res) => {
        if (fileExists(__dirname + req?.url)){
          res.sendFile(__dirname + req?.url);
        }else{
          res.send("404 page not found");
        }
    });
}
module.exports = appRouter;