import axios from 'axios';
import { GiosStation } from './gios.model';
import { Station } from '../../modules/stations/stations.interface';

function getGiosStationInfo(station: GiosStation): Station {
  if (!station) {
    return null;
  }

  return {
    externalId: station.id,
    address: station.addressStreet,
    name: station.stationName,
    city: station.city.name,
    province: station.city.commune.provinceName,
    source: 1,
    active: true,
    coordinates: {
      lat: station.gegrLat,
      lng: station.gegrLon,
    },
  };
}

const getLocationInfo = function(location) {
  const result: Station = {
    externalId: location.id,
    address: location.addressStreet,
    name: location.stationName,
    city: location.city.name,
    province: location.city.commune.provinceName,
    source: 1,
    active: true,
    coordinates: {
      lat: location.gegrLat,
      lng: location.gegrLon,
    },
  };

  return result;
};

export const getAllLocalLocations = async function() {
  const url = 'http://api.gios.gov.pl/pjp-api/rest/station/findAll';
  return new Promise(resolve => {
    try {
      axios.get(url)
        .then(response => {
          if (response.data) {
            const swietokrzyskie = response.data.filter(ob => ob.city.commune.provinceName === 'ŚWIĘTOKRZYSKIE');
            console.log(swietokrzyskie);
            Promise.resolve(swietokrzyskie);
          } else {
            Promise.reject('Error');
          }
        })
        .catch(error => {
          console.log(error);
          Promise.reject(error);
        });
    } catch (error) {
      Promise.reject(error);
    }
  });
};
//
// const getSensorsInLocation = async function(id) {
//   const url = 'http://api.gios.gov.pl/pjp-api/rest/station/sensors/' + id;
//
//   return new Promise(resolve => {
//     try {
//       axios.get(url)
//         .then(response => {
//           if (response.data) {
//             Promise.resolve(getSensorsList(response.data));
//           } else {
//             Promise.reject('Error');
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           Promise.reject(error);
//         });
//     } catch (error) {
//       Promise.reject(error);
//     }
//   });
// };
//
// const getSensorData = async function(id) {
//   const url = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/' + id;
//
//   return new Promise(resolve => {
//     try {
//       axios.get(url)
//         .then(response => {
//           if (response.data) {
//             resolve(response.data);
//           } else {
//             Promise.reject('Error');
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           Promise.reject(error);
//         });
//     } catch (error) {
//       Promise.reject(error);
//     }
//   });
// };
//
// const getSensorsList = function(sensors) {
//   const result = [];
//   for (let sensor of sensors) {
//     // console.log('sensor');
//     // console.log(sensor);
//     result.push({
//       id: sensor.id,
//       station: sensor.stationId,
//       sensorType: sensor.param.idParam,
//     });
//   }
//   return result;
// };
//
// export const start = async function() {
//   const result = [];
//   const locations = await getAllLocalLocations();
//   // console.log(locations.length);
//   for (let location of locations) {
//     const loc = getLocationInfo(location);
//
//     // console.log(loc);
//     const sensors = await getSensorsInLocation(location.id);
//     // console.log(sensors);
//
//     for (let sensor of sensors) {
//       // console.log(sensor);
//       const sensorData = await getSensorData(sensor.id);
//       // console.log(sensorData.values[0]);
//       sensor.data = sensorData.values[0];
//     }
//     loc.sensors = sensors;
//     result.push(loc);
//   }
//   console.log(JSON.stringify(result, null, 2));
// };
