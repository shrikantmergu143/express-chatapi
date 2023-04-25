const User = require("../models/user");
const fs = require('fs');
const path = require('path');
// Get the current date and time
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const currentDateTime = new Date().toLocaleString().replace(/[\s:\/,]/g, '');

const uploadProfile = async (req, res)=>{
    try{
      // Log the files to the console
      const user_id = req?.user?.user_id
      const user = await User.findById(user_id);
      if(user){
        const { file } = req.files;
        if (!file) return res.sendStatus(400);
    
        // If does not have image mime type prevent from uploading
        if (/^file/.test(file.mimetype)) return res.sendStatus(400);
        const fs = require('fs');
    
        // Specify the folder path you want to create
        const folderPath = `/profile/${user?._id}/`; // Example folder path
        const newImageName = `_${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
        // Use fs.mkdir to create the folder
        fs.mkdir(__dirname + folderPath, { recursive: true }, (err) => {
          if (err) {
            console.error(`Failed to create folder: ${err}`);
          } else {
            console.log(`Folder created successfully`);
          }
        });
        const fileExtension = file.name.split('.').pop();
        const fileName = file.name.split('.')[0];
        const image_path = folderPath + `${fileName}${newImageName}.${fileExtension}`;
        console.log("image_path", image_path)
        const original = "storage" + image_path;
        file.mv(__dirname + image_path);
        const respon = await User.findByIdAndUpdate(user_id, {profile_url:original}, null);
        if(respon !== false ){
          return res.status(200).json({
            file:original, 
            userDetails:{
              user_id:respon?._id,
              email:respon?.email,
              username:respon?.username,
              profile_url:original,
              first_name:respon?.first_name,
              last_name:respon?.last_name,
          }});
        }else{
          return res.status(400).json({status:"false"});
        }
        
      }else{
          return res.status(403).json({error:"invalid token"});
      }
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = uploadProfile;