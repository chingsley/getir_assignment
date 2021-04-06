import CollectionService from '../services/collection.services';

export default class CollectionController {
  static async getCollection(req, res, next) {
    try {
      const collectionService = new CollectionService(req);
      const data = await collectionService.getCollectionWithFilters();
      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  }
}
