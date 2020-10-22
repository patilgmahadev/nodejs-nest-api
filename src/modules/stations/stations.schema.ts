import * as mongoose from 'mongoose';

export const StationSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  province: String,
  coordinates: Object,
  source: String,
  externalId: Number,
  active: Boolean
});

export const StationModel = mongoose.model('Station', StationSchema);
