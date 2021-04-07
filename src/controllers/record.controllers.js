import RecordService from '../services/record.services';

export default class RecordsController {
  static async getRecords(req, res, next) {
    try {
      const recordService = new RecordService(req);
      const records = await recordService.getRecordsWithFilters();
      return res.status(200).json({ code: 0, msg: 'success', records });
    } catch (error) {
      return next(error);
    }
  }
}
