import * as mongoose from 'mongoose';

export const KeySchema = new mongoose.Schema({
  key: String,
  description: String,
  active: { type: Boolean, default: true },
});
export const KeyModel = mongoose.model('Key', KeySchema);
