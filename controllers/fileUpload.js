const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//function to check if image/video format is supported
function isSupportedType(type, supportedTypes) {
  return supportedTypes.includes(type);
}
//function to upload to cloudinary
async function uploadFileToCloudinary(file, folder,quality=100) {
  const options = { folder, resource_type: "auto",quality};
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

async function imageUpload(req, res) {
  try {
    const { name, email, tags } = req.body;
    console.log(name, email, tags);
    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "jpg", "png"];
    const type = file.name
      .substring(file.name.lastIndexOf(".") + 1)
      .toLowerCase();

    if (!isSupportedType(type, supportedTypes)) {
      return res.status(500).json({
        success: false,
        message: "Invalid File Type",
      });
    }
    //if supported , now upload to cloudinary
    //using upload function of cloudinary
    const response = await uploadFileToCloudinary(file, "fIleUploadClass2");
    console.log(response);

    try {
      const fileData = await File.create({
        name,
        imageUrl: response.secure_url,
        tags,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error creating entry in DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "image uploaded to cloudinary Successfully",
    });
  } catch (err) {
    console.log(err);
  }
}
async function videoUpload(req, res) {
  try {
    const { name, email, tags } = req.body;
    console.log(name, email, tags);
    const file = req.files.videoFile;
    console.log(file);

    //validation

    const supportedTypes = ["mp4", "mov"];
    const type = file.name.substring(file.name.lastIndexOf(".") + 1);

    if (!isSupportedType(type, supportedTypes)) {
      return res.status(500).json({
        success: false,
        message: "Invalid File Type",
      });
    }
    //uplaoding
    const response = await uploadFileToCloudinary(file, "fIleUploadClass2");
    console.log(response);

    try {
      const fileData = await File.create({
        name,
        imageUrl: response.secure_url,
        tags,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error creating entry in DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video uploaded to cloudinary Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Ni hua bhai",
    });
  }
}
async function imageReducerUpload(req, res) {
  try{
    const { name, email, tags } = req.body;
    console.log(name, email, tags);
    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "jpg", "png","heic"];
    const type = file.name
      .substring(file.name.lastIndexOf(".") + 1)
      .toLowerCase();
console.log(type)
    if (!isSupportedType(type, supportedTypes)) {
      return res.status(500).json({
        success: false,
        message: "Invalid File Type",
      });
    }
    
    //if supported , now upload to cloudinary
    //using upload function of cloudinary
    const response = await uploadFileToCloudinary(file,"fIleUploadClass2");
    console.log(response);

    try {
      const fileData = await File.create({
        name,
        imageUrl: response.secure_url,
        tags,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error creating entry in DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "image size reduced and uploaded to cloudinary Successfully",
    });
  }catch(err){
    return res.status(400).json({
      success: false,
      message: "Ni hua bhai",
    });
  }
}

function localFileUpload(req, res) {
  const file = req.files.merifile;
  console.log(file);
  const extension = file.name.substring(file.name.lastIndexOf("."));

  //path of server
  let path = __dirname + /files/ + Date.now() + extension;

  //file is path pe move kerdi mv function se
  file.mv(path, (err) => {
    console.log(err);
  });
  res.status(200).json({
    success: true,
    message: "File Uploaded locally Successfully",
  });
}

module.exports = {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
};
