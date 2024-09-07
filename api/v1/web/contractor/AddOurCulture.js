const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AddOurCulture } = require("../../../../services/contractor/contractor");
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
 * /api/v1/Contractor/AddOurCulture:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save Category information.
 *   description: API used for saving category information with images.
 *   parameters:
 *      - in: formData
 *        name: categoryName
 *        description: Category name.
 *        type: string
 *      - in: formData
 *        name: comingSoon
 *        description: Coming soon information.
 *        type: string
 *      - in: formData
 *        name: images
 *        description: Multiple image files.
 *        type: array
 *        items:
 *          type: file
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

router.post(
  "/AddOurCulture",
  upload.array('images'), // Changed to handle multiple files
  async (req, res, next) => {
    try {
      console.log("Request body:", req.body);
      console.log("Request files:", req.files);

      // Call your service function to handle the files
      const result = await AddOurCulture(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;