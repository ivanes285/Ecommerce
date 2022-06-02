const router = require("express").Router();

const cloudinary = require("cloudinary");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Upload image only admin can use
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    console.log("object.keys", Object.keys(req.files));
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send({ message: "No files were uploads" });

    const file = req.files.file;
    //esto es 10mb
    if (file.size > 1024 * 1024 * 10) {
      removeTmp(file.tempFilePath);
      return res.status(400).send({ message: "Size too large" });
    }

    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).send({ message: "File format is incorrect" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Delete Images only admin can use
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ message: "No images Selected" });
    cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) throw error;
      res.json({ message: "Deleted Image" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
