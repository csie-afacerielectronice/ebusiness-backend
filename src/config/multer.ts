import fs from "fs";
import path from "path";
import multer from "multer";
import crypto from "crypto";
import mkdirp from "mkdirp";

class Multer {
  static productUpload(): Multer {
    const productStorage = multer.diskStorage({
      destination: function (_1, _2, cb) {
        const dest = "uploads/product/";
        if (!fs.existsSync(dest)) {
          mkdirp.sync(dest);
        }
        cb(null, dest);
      },
      filename: function (_, file, cb) {
        cb(
          null,
          crypto.randomBytes(18).toString("hex") +
            Date.now() +
            path.extname(file.originalname)
        );
      },
    });
    return multer({
      storage: productStorage,
      fileFilter: (_, file, cb) => {
        if (
          [".jpg", ".jpeg", ".png"].some(
            (item) => item === path.extname(file.originalname)
          )
        ) {
          cb(null, true);
        } else cb(null, false);
      },
    });
  }
}

export default Multer;
