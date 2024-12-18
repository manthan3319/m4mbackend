const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { updateAboutUs } = require("../../../../services/contractor/contractor");
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
 * /api/v1/Contractor/updateAboutUs:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save Category information.
 *   description: API used for saving category information.
 *   parameters:
 *      - in: formData
 *        name: content
 *        description: content.
 *        type: string
 *      - in: formData
 *        name: image
 *        description: Image file.
 *        type: file
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

router.post(
  "/updateAboutUs",
  upload.single('image'), // Ensure this is used for handling file uploads
  async (req, res, next) => {
    try {
      console.log("Request body:", req.body);
      console.log("Request file:", req.file);

      const result = await updateAboutUs(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;