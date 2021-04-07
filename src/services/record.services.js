import Records from '../database/models/Records';
/**
 * This class handles the the database calls to
 * fetch the required data
 */
export default class RecordService {
  constructor({ body }) {
    this.body = body;
  }

  async getRecordsWithFilters() {
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
        ({ totalCount }) =>
          totalCount > Number(minCount) && totalCount < Number(maxCount)
      );
  }

  /**
   *
   * @param {array} counts the array of numbers to be summed
   * @returns the sum of the counts array
   */
  sum(counts) {
    return counts.reduce((acc, number) => {
      acc += number;
      return acc;
    });
  }
}
