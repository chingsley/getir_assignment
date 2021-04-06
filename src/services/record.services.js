import Records from '../database/models/Records';

export default class CollectionService {
  constructor({ body, files, query, params, user: operator }) {
    this.body = body;
    this.files = files;
    this.query = query;
    this.params = params;
    this.operator = operator;
  }
  async getCollectionWithFilters() {
    const { startDate, endDate, minCount, maxCount } = this.body;
    const records = await Records.find(
      {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
      { key: 1, createdAt: 1, counts: 1, _id: 0 }
    );

    return records
      .reduce((acc, record) => {
        acc.push({
          key: record.key,
          createdAt: record.createdAt,
          totalCount: this.sum(record.counts),
        });
        return acc;
      }, [])
      .filter(
        ({ totalCount }) => totalCount > minCount && totalCount < maxCount
      );
  }

  sum(counts) {
    return counts.reduce((acc, number) => {
      acc += number;
      return acc;
    });
  }
}
