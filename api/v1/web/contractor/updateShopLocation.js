const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { updateShopLocation } = require("../../../../services/contractor/contractor");
const router = new Router();

// Configure Multer for file uploads
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
    cb(null, Date.now() + '-' + originalName); 
  }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/v1/Contractor/updateShopLocation:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Update Shop Location information.
 *   description: API used for updating shop location information.
 *   consumes:
 *    - multipart/form-data
 *   parameters:
 *    - in: formData
 *      name: name
 *      description: Shop Name
 *      required: true
 *      type: string
 *    - in: formData
 *      name: description 
 *      description: Shop Description
 *      required: true
 *      type: string
 *    - in: formData
 *      name: address
 *      description: Shop Address
 *      required: true
 *      type: string
 *    - in: formData
 *      name: number
 *      description: Phone Number
 *      required: true
 *      type: string
 *    - in: formData
 *      name: mapsLink
 *      description: Google Maps Link
 *      required: true
 *      type: string
 *    - in: formData
 *      name: mapsgallery
 *      description: Map Gallery Link
 *      required: true
 *      type: string
 *    - in: formData
 *      name: images
 *      description: Images of the shop (multiple)
 *      required: true
 *      type: file
 *      collectionFormat: multi
 *    - in: formData
 *      name: video
 *      description: Shop Video (optional)
 *      type: file
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

router.post(
  "/updateShopLocation",
  upload.fields([
    { name: 'images', maxCount: 5 },  
    { name: 'video', maxCount: 1 }   
  ]),
  async (req, res, next) => {
    try {
      // console.log("Request body:", req.body);
      // console.log("Request files:", req.files);

      const result = await updateShopLocation(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
