import { ObjectID } from 'mongoose';

export interface Data {
  value: number;
  date: Date,
  type: ObjectID,
  station: ObjectID
}