const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mkdirp = require('mkdirp');
const storageAvatar = multer.diskStorage({
  destination: function(req, file, cb) {
    const dest = 'uploads/avatar/';
    if (!fs.existsSync(dest)) {
      mkdirp.sync(dest);
    }
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const storageProduct = multer.diskStorage({
  destination: function(req, file, cb) {
    const dest = 'uploads/product/';
    if (!fs.existsSync(dest)) {
      mkdirp.sync(dest);
    }
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadAvatar = multer({ storage: storageAvatar });
const uploadProduct = multer({ storage: storageProduct });

module.exports = {
  avatar: uploadAvatar,
  product: uploadProduct
};
