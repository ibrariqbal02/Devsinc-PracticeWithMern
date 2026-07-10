const multer = require("multer");

const upload = multer({
  dest: "uploads",
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

const mulmid = upload.single("image");

module.exports = { mulmid };

// console.log(mulmid)

