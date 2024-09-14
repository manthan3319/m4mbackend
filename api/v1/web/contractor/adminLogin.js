/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { adminLogin } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/Contractor/adminLogin:
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
 *           email:
 *             type: string
 *           password:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  email: Joi.string().required().label("email"),
  password: Joi.string().required("password"),
});

router.post(
  "/adminLogin",
  commonResolver.bind({
    modelService: adminLogin,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
