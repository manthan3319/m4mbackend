/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { getShopLocationList } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/Contractor/getShopLocationList:
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
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */



router.post(
  "/getShopLocationList",
  commonResolver.bind({
    modelService: getShopLocationList,
  })
);

module.exports = router;
