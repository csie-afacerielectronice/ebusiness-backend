const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const mkdirp = require("mkdirp");

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "uploads/product/";
    if (!fs.existsSync(dest)) {
      mkdirp.sync(dest);
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      crypto.randomBytes(18).toString("hex") +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadProduct = multer({
  storage: storageProduct,
  fileFilter: (req, file, cb) => {
    if (
      [".jpg", ".jpeg", ".png"].some(
        (item) => item === path.extname(file.originalname)
      )
    ) {
      cb(null, true);
    } else cb(null, false);
  },
});

module.exports = {
  product: uploadProduct,
};
