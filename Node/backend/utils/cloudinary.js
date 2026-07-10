require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_Name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRECT_KEY,
});

const uploadToCloud = async (imagePath) => {
  try {
    const upload = await cloudinary.uploader.upload(imagePath, {
      folder: "Service nest",
    });

    return upload;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { uploadToCloud };
