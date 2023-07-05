// import { config } from "dotenv";
// import { v2 as cloudinary} from "cloudinary"
// config();
// cloudinary.config({
// cloud_name: process.env.CLOUD_NAME,
// api_key: process.env.API_KEY,
// api_secret: process.env.APT_SECRET,
//  });
// console.log(cloudinary.config());
// export { cloudinary };
// const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINDRY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(cloudinary.config());

module.exports =  cloudinary ;

