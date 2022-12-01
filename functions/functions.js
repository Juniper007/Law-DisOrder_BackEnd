// crimeData format {
//       "community_name": "RUNDLE",
//       "year": "2022",
//       "sector": "NORTHEAST",
//       "resident_count": "11688",
//       "long": "-113.97005811864892",
//       "id": "2022-SEP-RUNDLE-Break & Enter - Commercial",
//       "date": "2022-09-01T00:00:00.000",
//       "category": "Break & Enter - Commercial",
//       "crime_count": "1",
//       "lat": "51.074239973666835",
//       "month": "SEP"}
//
import fs from 'fs';

function monthsBack(year, month) {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  switch (month.toLowerCase()) {
    case 'jan':
      month = 1;
      break;
    case 'feb':
      month = 2;
      break;
    case 'mar':
      month = 3;
      break;
    case 'apr':
      month = 4;
      break;
    case 'may':
      month = 5;
      break;
    case 'jun':
      month = 6;
      break;
    case 'jul':
      month = 7;
      break;
    case 'aug':
      month = 8;
      break;
    case 'sep':
      month = 9;
      break;
    case 'oct':
      month = 10;
      break;
    case 'nov':
      month = 11;
      break;
    case 'dec':
      month = 12;
      break;
  }
  return curYear * 12 + curMonth - month - year * 12;
}

function weighCrime(crimeData, weightTable, hasRecencyBias = true) {
  const weightedData = [];
  let severityWeight = 0;
  for (const i in crimeData) {
    weightedData[i] = {};
    Object.assign(weightedData[i], crimeData[i]);
    let isWeighted = false;
    let event = crimeData[i].category.toLowerCase();
    // set weight
    for (const j in weightTable) {
      switch (j) {
        case 'assault':
          if (event.includes('assault')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'bneStore':
          if (event.includes('break') && event.includes('comm')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'bneHome':
          if (event.includes('break') && event.includes('dwell')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'bneOther':
          if (event.includes('break') && event.includes('other')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'robOfCar':
          if (event.includes('of vehicle')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'robFromCar':
          if (event.includes('from vehicle')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'robStore':
          if (event.includes('commercial robbery')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'robStreet':
          if (event.includes('street robbery')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
        case 'violence':
          if (event.includes('violence')) {
            severityWeight = weightTable[j];
            isWeighted = true;
          }
          break;
      }
      if (isWeighted) {
        break;
      }
    }

    // multiply weight
    if (hasRecencyBias) {
      weightedData[i].crimeScore =
        (weightedData[i].crime_count * severityWeight) /
        monthsBack(weightedData[i].year, weightedData[i].month) ** 2;
    } else {
      weightedData[i].crimeScore = weightedData[i].crime_count * severityWeight;
    }
    delete weightedData[i].crime_count;
    delete weightedData[i].month;
    delete weightedData[i].year;
  }
  return weightedData;
}

function findCenter(long_latArray) {
  let latMax = -Infinity;
  let latMin = Infinity;
  let longMax = -Infinity;
  let longMin = Infinity;
  for (const i in long_latArray[0][0]) {
    if (long_latArray[0][0][i][0] > longMax) {
      longMax = long_latArray[0][0][i][0];
    }
    if (long_latArray[0][0][i][0] < longMin) {
      longMin = long_latArray[0][0][i][0];
    }
    if (long_latArray[0][0][i][1] > latMax) {
      latMax = long_latArray[0][0][i][1];
    }
    if (long_latArray[0][0][i][1] < latMin) {
      latMin = long_latArray[0][0][i][1];
    }
  }
  const long = (longMax + longMin) / 2;
  const lat = (latMax + latMin) / 2;
  return [long, lat];
}

function sumAndNormalize(weightedData) {
  const sectorMap = JSON.parse(
    fs.readFileSync('./functions/boundaries.geojson', 'utf-8')
  );
  // Making an array of objects with {communityname, an empty crime score, latitude, longitude}
  for (const i in sectorMap.features) {
    sectorMap.features[i].properties.crimeScore = 0;
    const [long, lat] = findCenter(sectorMap.features[i].geometry.coordinates);
    sectorMap.features[i].properties.communityCentre = {
      lat: lat,
      long: long
    };
  }

  for (const j in weightedData) {
    for (const i in sectorMap.features) {
      if (
        weightedData[j].community_name === sectorMap.features[i].properties.name
      ) {
        sectorMap.features[i].properties.crimeScore =
          sectorMap.features[i].properties.crimeScore +
          weightedData[j].crimeScore;
        break;
      }
    }
  }
  // for (const i in sectorMap.features) {
  //   sectorMap.features[i].properties.crimeScore = 0;
  //   const [long, lat] = findCenter(sectorMap.features[i].geometry.coordinates);
  //   sectorMap.features[i].properties.communityCentre = { lat: lat, long: long };
  //   for (const j in weightedData) {
  //     if (
  //       weightedData[j].community_name === sectorMap.features[i].properties.name
  //     ) {
  //       sectorMap.features[i].properties.crimeScore =
  //         sectorMap.features[i].properties.crimeScore +
  //         weightedData[j].crimeScore;
  //     }
  //   }
  // }

  let max = 0;
  for (const i in sectorMap.features) {
    if (sectorMap.features[i].properties.crimeScore > max) {
      max = sectorMap.features[i].properties.crimeScore;
    }
  }
  for (const i in sectorMap.features) {
    if (max > 0) {
      sectorMap.features[i].properties.crimeScore =
        sectorMap.features[i].properties.crimeScore / max;
    }
  }
  const mapFile = sectorMap;
  return mapFile;
}

export function applyMath(crimeData, weightTable, hasRecencyBias) {
  const weightedData = weighCrime(crimeData, weightTable, hasRecencyBias);

  const mapData = sumAndNormalize(weightedData);
  return mapData;
}
