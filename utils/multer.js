// const multer = require("multer")
// const path = require("path")

// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter : (req, file, cb) => {
//         let ext = path.extname(file.orginalname)
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(new Error("File Type Is Not Supported"), false)
//             return ;
//         }
//         cb(null , true)
//         },
//     })
const multer = require('multer');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the uploaded file name
  },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;
