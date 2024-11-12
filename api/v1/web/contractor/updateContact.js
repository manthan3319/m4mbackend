const express = require('express');
const { updateContact } = require("../../../../services/contractor/contractor");
const router = express.Router();

/**
 * @swagger
 * /api/v1/Contractor/updateContact:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save or update contact information.
 *   description: API used for saving or updating contact information.
 *   parameters:
 *      - in: formData
 *        name: role
 *        description: Role of the contact (e.g., BRAND, FOUNDER, SALES).
 *        type: string
 *      - in: formData
 *        name: name
 *        description: Name of the contact.
 *        type: string
 *      - in: formData
 *        name: contact
 *        description: Contact number or email of the contact.
 *        type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

router.post('/updateContact', async (req, res, next) => {
  try {
    const result = await updateContact(req);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in updateContact API:', error);
    res.status(400).json({ message: 'Failed to update contact', error: error.message });
  }
});

module.exports = router;
