import { extname } from "path";

export const imageFileFilter = (
  _: any,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const editFileName = (
  _: any,
  file: Express.Multer.File,
  callback: (error: Error, fileName: string) => void,
) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${randomName}${fileExtName}`);
};
