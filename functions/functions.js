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

function sumAndNormalize(weightedData) {
  let summedByCommunity = [];
  const normalizedByCommunity = [];

  let communityList = [];

  // grabbing a community list out of the raw
  {
    for (const i in weightedData) {
      communityList[i] = weightedData[i].community_name;
    }
    communityList = [...new Set(communityList)];
    communityList.sort();
  }
  // Making an array of objects with {communityname, an empty crime score, latitude, longitude}
  for (const i in communityList) {
    summedByCommunity[i] = {};
    summedByCommunity[i].community = communityList[i];
    summedByCommunity[i].crimeScore = 0;
    for (const j in weightedData) {
      if (weightedData[j].community_name === communityList[i]) {
        if (
          summedByCommunity[i].lat === undefined ||
          summedByCommunity[i].lat === 0 ||
          summedByCommunity[i].lat === null
        ) {
          summedByCommunity[i].lat = weightedData[j].lat;
        }
        if (
          summedByCommunity[i].long === undefined ||
          summedByCommunity[i].long === 0 ||
          summedByCommunity[i].long === null
        ) {
          summedByCommunity[i].long = weightedData[j].long;
        }
        summedByCommunity[i].crimeScore =
          summedByCommunity[i].crimeScore + weightedData[j].crimeScore;
      }
    }
  }

  let max = 0;
  for (const i in summedByCommunity) {
    normalizedByCommunity[i] = {};
    if (summedByCommunity[i].crimeScore > max) {
      max = summedByCommunity[i].crimeScore;
    }
    Object.assign(normalizedByCommunity[i], summedByCommunity[i]);
  }
  for (const i in normalizedByCommunity) {
    if (max > 0) {
      normalizedByCommunity[i].crimeScore =
        normalizedByCommunity[i].crimeScore / max;
    }
  }
  return [normalizedByCommunity, summedByCommunity];
}

function toGeoJSON(crimeByCommunity) {
  const mapFile = JSON.parse(
    fs.readFileSync('./functions/boundaries.geojson', 'utf-8')
  );
  console.log(mapFile);
  for (const i in crimeByCommunity) {
    const communityName = crimeByCommunity[i].community;
    console.log(communityName);
    const community = mapFile.features.find(
      (feature) => feature.properties.name === communityName
    );
    console.log(community);
    community.properties.crimeScore = crimeByCommunity[i].crimeScore;
  }
  return mapFile;
}

export function applyMath(crimeData, weightTable, hasRecencyBias) {
  const weightedData = weighCrime(crimeData, weightTable, hasRecencyBias);

  const [normalizedByCommunity, summedByCommunity] =
    sumAndNormalize(weightedData);
  const mapData = toGeoJSON(summedByCommunity);
  return mapData;
}
