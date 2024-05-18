const authRoutes = require("./../routes/authRoutes")
const userRoutes = require("./../routes/userRoutes");
const usersRoutes = require("./../routes/usersRoutes");
const listRoutes = require("./../routes/listRoutes");
const messageRoutes = require("./../routes/messageRoutes");
const groupRoutes = require("./../routes/groupRoutes");
const fs = require('fs');
const App_url = require("../constant/App_url");
const puppeteer = require('puppeteer');
const StorageBucket = require("./../models/storageBucket");
const uuid = require("uuid");

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
    app.post('/api/upload-file', async (req, res) => {
      try {
        const id = uuid.v4();

        const result = req.body;

        const newFile = new StorageBucket({
          file_id: id,
          bucket_id: id,
          asset_id: result.asset_id,
          public_id: result.public_id,
          version: result.version,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          created_at: result.created_at,
          tags: result.tags,
          bytes: result.bytes,
          type: result.type,
          etag: result.etag,
          placeholder: result.placeholder,
          url: result.url,
          secure_url: result.secure_url,
          folder: result.folder,
          original_filename: result.original_filename,
          created_at: new Date(),
          updated_at: new Date(),
        });
    
        await newFile.save();
        res.status(200).json(newFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
}
module.exports = appRouter;