/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { deleteShopLocation } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/Contractor/deleteShopLocation:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save Contractor information.
 *   description: api used for Save Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           shopid:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  shopid: Joi.string().required().label("shopid"),
});

router.post(
  "/deleteShopLocation",
  commonResolver.bind({
    modelService: deleteShopLocation,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
