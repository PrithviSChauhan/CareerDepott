import multer from "multer";

const storage = multer.memoryStorage();
export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);
