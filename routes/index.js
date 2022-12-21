var express = require("express");
var router = express.Router();

const cloudinary = require("cloudinary").v2;
const uniqid = require("uniqid");
const fs = require("fs");

router.post("/upload", async (req, res) => {
  const { photoRecto, photoVerso, photoSelfie, photoProfil } = req.files;
  let photo;

  if (photoRecto) photo = photoRecto;
  if (photoVerso) photo = photoVerso;
  if (photoSelfie) photo = photoSelfie;
  if (photoProfil) photo = photoProfil;
  const photoPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await photo.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultMove });
  }

  fs.unlinkSync(photoPath);
});

module.exports = router;
