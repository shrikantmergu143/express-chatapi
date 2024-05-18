const authRoutes = require("./../routes/authRoutes")
const userRoutes = require("./../routes/userRoutes");
const usersRoutes = require("./../routes/usersRoutes");
const listRoutes = require("./../routes/listRoutes");
const messageRoutes = require("./../routes/messageRoutes");
const groupRoutes = require("./../routes/groupRoutes");
const fs = require('fs');
const App_url = require("../constant/App_url");
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;

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
    app.post("/api/pdf",  async (req, res) => {
      const { url } = req.query;
      
      if (!url) {
          return res.status(400).send('Please provide a URL parameter');
      }
  
      try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(url, { waitUntil: 'networkidle0' });
          
          const pdfBuffer = await page.pdf({ format: 'A4' });
          
          await browser.close();
  
          res.contentType("application/pdf");
          res.send(pdfBuffer);
      } catch (error) {
          console.error('Error converting to PDF:', error);
          res.status(500).send('An error occurred while converting to PDF');
      }
    });
    app.post('/upload-file', async (req, res) => {
      try {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }
    
        const file = req.files.file;
    
        // Upload file to Cloudinary
        cloudinary.uploader.upload(file.tempFilePath, { folder: "uploads" }, (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).send(error);
          }
          res.json({ url: result.secure_url });
        });
    
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
}
module.exports = appRouter;