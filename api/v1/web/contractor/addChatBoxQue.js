const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addChatBoxQue } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/contractor/addChatBoxQue:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save ChatBox Question.
 *   description: API used to save question and answers in ChatBox.
 *   parameters:
 *      - in: body
 *        name: chatBoxData
 *        description: Save question and related answers.
 *        schema:
 *         type: object
 *         properties:
 *           question:
 *             type: string
 *           answers:
 *             type: array
 *             items:
 *               type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  question: Joi.string().required().label("Question"),
  answers: Joi.array().items(Joi.string()).required().label("Answers"),
});

router.post(
  "/addChatBoxQue",
  commonResolver.bind({
    modelService: addChatBoxQue,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
