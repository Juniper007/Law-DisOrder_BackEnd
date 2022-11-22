let crimeData = require("./crime_data.json");
// crimeData.features is array of
// {
//     "type": "Feature",
//     "properties": {
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
//       "month": "SEP"
//     },
//     "geometry": {
//       "type": "Point",
//       "coordinates": [-113.970058118649, 51.074239973667]
//     }
// }

let i = 0;
const originalInstanceOrder = [];
let communityNames = [];
let crimeTypes = [];
const shitICareAbout = [];
let organizedData = [];
const weights = {
  assault: 7,
  bneStore: 6,
  bneHome: 8,
  bneOther: 6,
  robStore: 5,
  robStreet: 10,
  robFromCar: 6,
  robOfCar: 7,
  violence: 10,
};

function monthsBack(year, month) {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  switch (month.toLowerCase()) {
    case "jan":
      month = 1;
      break;
    case "feb":
      month = 2;
      break;
    case "mar":
      month = 3;
      break;
    case "apr":
      month = 4;
      break;
    case "may":
      month = 5;
      break;
    case "jun":
      month = 6;
      break;
    case "jul":
      month = 7;
      break;
    case "aug":
      month = 8;
      break;
    case "sep":
      month = 9;
      break;
    case "oct":
      month = 10;
      break;
    case "nov":
      month = 11;
      break;
    case "dec":
      month = 12;
      break;
  }
  return curYear * 12 + curMonth - month - year * 12;
}

// Attempting stuff
function weightedData(data, weights, filters) {
  valueTable = [];
  TODO;
  for (i in filters) {
    eval(`const ${filters[i]}Table = []`);
  }
  for (i in data) {
    switch (filters) {
      case "assault":
        if (data.crime.toLowerCase.contains("assault")) {
          assaultTable.push(data[i]);
        }
        break;
      case "bne" || "bneComm" || "bneHome" || "bneOther":
        if (data.crime.toLowerCase.contains("break")) {
          if (
            data.crime.toLowerCase.contains("comm") &&
            typeof bneCommTable !== "undefined"
          ) {
          } else if (
            data.crime.toLowerCase.contains("dwell") &&
            typeof bneHomeTable !== "undefined"
          ) {
          } else if (
            data.crime.toLowerCase.contains("other") &&
            typeof bneOtherTable !== "undefined"
          ) {
          } else {
            bneTable.push(data[i]);
          }
        }
        break;
    }
  }
}

for (i in crimeData.features) {
  // originalInstanceOrder[i] = [
  //   crimeData.features[i].properties.category,
  //   crimeData.features[i].properties.community_name,
  //   i,
  // ];
  shitICareAbout[i] = {
    crime: crimeData.features[i].properties.category,
    community: crimeData.features[i].properties.community_name,
    monthsBack: monthsBack(
      crimeData.features[i].properties.year,
      crimeData.features[i].properties.month
    ),
    count: +crimeData.features[i].properties.crime_count,
  };
  communityNames[i] = crimeData.features[i].properties.community_name;
  crimeTypes[i] = crimeData.features[i].properties.category;
}

crimeTypes = [...new Set(crimeTypes)];
crimeTypes.sort();

communityNames = [...new Set(communityNames)];
communityNames.sort();
console.log(shitICareAbout[15000]);

// originalInstanceOrder.sort();
console.log(crimeTypes);
// console.log(communityNames);
// console.log(originalInstanceOrder);

// for (i in originalInstanceOrder) {
//   // console.log(originalInstanceOrder[i][2]);
//   organizedData[i] = crimeData.features[originalInstanceOrder[i][2]];
// }
// console.log(organizedData);
