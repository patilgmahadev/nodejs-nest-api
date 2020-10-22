export interface GiosCity {
  id: number,
  name: string,
  commune: {
    communeName: string,
    districtName: string,
    provinceName: string
  }
}

export interface GiosStation {
  id: number,
  stationName: string,
  gegrLat: number,
  gegrLon: number,
  city: GiosCity,
  addressStreet: string
}

export interface GiosSensor {
  id: number,
  stationId: number,
  param: {
    paramName: string,
    paramFormula: string,
    paramCode: string,
    idParam: number
  }
}

export interface GiosValue {
  data: string,
  value: number
}

export interface GiosData {
  key: string,
  values: GiosValue[]
}