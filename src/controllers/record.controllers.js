import CollectionService from '../services/record.services';

export default class RecordsController {
  static async getRecords(req, res, next) {
    try {
      const collectionService = new CollectionService(req);
      const records = await collectionService.getRecordsWithFilters();
      return res.status(200).json({ code: 0, msg: 'success', records });
    } catch (error) {
      return next(error);
    }
  }
}
