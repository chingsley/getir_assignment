import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  counts: {
    type: [Number],
  },
  key: {
    type: String,
  },
  value: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
export default mongoose.model('Records', RecordSchema);
