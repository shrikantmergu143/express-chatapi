const User = require("../models/user");
const fs = require('fs');
const path = require('path');

const uploadProfile = async (req, res)=>{
    // try{
    // Log the files to the console
    const user_id = req?.user?.user_id
    const user = await User.findOne({ _id:user_id});
        const { file } = req.files;
        console.log("file", file)
    if (!file) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (/^file/.test(file.mimetype)) return res.sendStatus(400);
    const fs = require('fs');

    // Specify the folder path you want to create
    const folderPath = __dirname + `/profile/${user?._id}/`; // Example folder path
    
    // Use fs.mkdir to create the folder
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Failed to create folder: ${err}`);
      } else {
        console.log(`Folder created successfully`);
      }
    });
    file.mv(__dirname + folderPath + file.name);

    return res.status(200).json({file:folderPath});
    // }catch(err){
    //     return res.status(500).json({error:"Error occured, Please try again"});
    // }
}
module.exports = uploadProfile;