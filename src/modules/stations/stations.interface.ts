import { ObjectID } from 'mongoose';

export enum StationProvider {
  LOOK02 = 1,
  AIRLY = 2,
  GIOS = 3,
  SYNGEOS = 4,
  LUFTDATEN = 5,
  BI = 6,
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Station {
  name: string;
  address: string;
  city: string;
  province: string;
  coordinates: Location;
  source: StationProvider;
  externalId: number;
  active: boolean;
}