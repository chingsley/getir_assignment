import { Joi } from '../validators/joi';

export default class RecordsMiddleware {
  static async validateReqBody(req, res, next) {
    try {
      const joiSchema = Joi.object({
        startDate: Joi.date().format('YYYY-MM-DD').required(),
        endDate: Joi.date().format('YYYY-MM-DD').required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
      });
      const { error } = joiSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ code: 3, msg: error.message });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
