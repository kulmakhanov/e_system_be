const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = _basedir + "/media/image/" + req.body.uid;
    
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log("Folder created successfully!");
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("img");

let uploadFileMiddleWare = util.promisify(uploadFile);

module.exports = uploadFileMiddleWare;