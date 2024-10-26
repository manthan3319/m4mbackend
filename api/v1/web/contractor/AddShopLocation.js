const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AddShopLocation } = require("../../../../services/contractor/contractor");
const router = new Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.resolve(__dirname, '../../../../images');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, originalName);
  }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/v1/Contractor/AddShopLocation:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save shop location information.
 *   description: API used for saving shop location information.
 *   parameters:
 *      - in: formData
 *        name: name
 *        description: Shop name.
 *        type: string
 *      - in: formData
 *        name: description
 *        description: Shop description.
 *        type: string
 *      - in: formData
 *        name: address
 *        description: Shop address.
 *        type: string
 *      - in: formData
 *        name: images
 *        description: Image files.
 *        type: file
 *        collectionFormat: multi
 *      - in: formData
 *        name: video
 *        description: Video file.
 *        type: file
 *      - in: formData
 *        name: number
 *        description: Contact number.
 *        type: string
 *      - in: formData
 *        name: mapsLink
 *        description: Google Maps link.
 *        type: string
 *      - in: formData
 *        name: mapsgallery
 *        description: Gallery information for maps.
 *        type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

router.post(
  "/AddShopLocation",
  upload.fields([{ name: 'images', maxCount: 5 }, { name: 'video', maxCount: 1 }]),
  async (req, res, next) => {
    try {
      console.log("Request body:", req.body);
      console.log("Request files:", req.files);

      const result = await AddShopLocation(req);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in AddShopLocation:", error);
      res.status(400).json({ message: "Failed to add shop location", error: error.message });
    }
  }
);

module.exports = router;
