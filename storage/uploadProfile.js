const User = require("../models/user");
const fs = require('fs');
const path = require('path');

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
        
        // Use fs.mkdir to create the folder
        fs.mkdir(__dirname+folderPath, { recursive: true }, (err) => {
          if (err) {
            console.error(`Failed to create folder: ${err}`);
          } else {
            console.log(`Folder created successfully`);
          }
        });
        const image_path = folderPath + file.name;
        const original = "storage" + image_path;
        file.mv(__dirname + image_path);
        const response = await User.findByIdAndUpdate(user_id, {profile_url:original});
        return res.status(200).json({file:original, userDetails:{
          user_id:response?._id,
          email:response?.email,
          username:response?.username,
          profile_url:response?.profile_url,
          first_name:response?.first_name,
          last_name:response?.last_name,
        }});
      }else{
          return res.status(403).json({error:"invalid token"});
      }
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = uploadProfile;