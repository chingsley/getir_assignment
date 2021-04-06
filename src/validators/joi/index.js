import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

export const Joi = JoiBase.extend(JoiDate);
