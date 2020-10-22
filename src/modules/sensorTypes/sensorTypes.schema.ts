import * as mongoose from 'mongoose';

export const SensorTypeSchema = new mongoose.Schema({
  paramName: String,
  paramCode: String,
  id: Number,
});

export const SensorTypeModel = mongoose.model('SensorType', SensorTypeSchema);
