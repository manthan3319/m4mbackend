/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { chatBoxQuestionDelete } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/Contractor/chatBoxQuestionDelete:
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
 *           chatboxId:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  chatboxId: Joi.string().required().label("chatboxId"),
});

router.post(
  "/chatBoxQuestionDelete",
  commonResolver.bind({
    modelService: chatBoxQuestionDelete,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
