import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
  value: Number,
date: Date,
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'SensorType' },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

export const DataModel = mongoose.model('Data', DataSchema);
