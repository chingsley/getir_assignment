export default class CollectionService {
  constructor({ body, files, query, params, user: operator }) {
    this.body = body;
    this.files = files;
    this.query = query;
    this.params = params;
    this.operator = operator;
  }
  async getCollectionWithFilters() {
    return 'testing testing...';
  }
}
