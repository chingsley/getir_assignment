import { Joi } from '../validators/joi';

export default class CollectionMiddleware {
  static async validateReqBody(req, res, next) {
    try {
      const joiSchema = Joi.object({
        startDate: Joi.date().format('YYYY-MM-DD').required(),
        endDate: Joi.date().format('YYYY-MM-DD').required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
      });
      const { error, value } = joiSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      req.body = value;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
