import CollectionService from '../services/record.services';

export default class CollectionController {
  static async getCollection(req, res, next) {
    try {
      const collectionService = new CollectionService(req);
      const records = await collectionService.getCollectionWithFilters();
      return res.status(200).json({ code: 0, msg: 'success', records });
    } catch (error) {
      return next(error);
    }
  }
}
