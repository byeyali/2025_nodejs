// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");

// 다운로드 디렉토리 설정
const uploadDir = `public/uploads`;
// http://localhost:3000/downloads/aa.png - uploadDir 아래에서 찾음

// 멀터저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 요 파일이 있는 디렉토리 하위로 uploadDir 생성
  filename: function (req, file, cb) {
    // file.originalname : aa
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // Error
      fname
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
