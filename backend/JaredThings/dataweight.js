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

export function weighCrime(
  crimeData,
  timeWeight,
  severityWeight,
  communityObjects
) {
  const weightedData = [];
  for (const i in communityObjects) {
    weightedData[i] = {};
    Object.assign(weightedData[i], communityObjects[i]);
    switch (timeWeight) {
      case "summer":
        for (const j in crimeData) {
          if (
            crimeData[j].community_name === communityObjects[i].community &&
            (crimeData[j].month === "JUN" ||
              crimeData[j].month === "JUL" ||
              crimeData[j].month === "AUG")
          ) {
            weightedData[i].crimeScore =
              weightedData[i].crimeScore +
              crimeData[j].crime_count * severityWeight;
          }
        }
        break;
      case "fall":
        for (const j in crimeData) {
          if (
            crimeData[j].community_name === communityObjects[i].community &&
            (crimeData[j].month === "SEP" ||
              crimeData[j].month === "OCT" ||
              crimeData[j].month === "NOV")
          ) {
            weightedData[i].crimeScore =
              weightedData[i].crimeScore +
              crimeData[j].crime_count * severityWeight;
          }
        }
        break;
      case "winter":
        for (const j in crimeData) {
          if (
            crimeData[j].community_name === communityObjects[i].community &&
            (crimeData[j].month === "DEC" ||
              crimeData[j].month === "JAN" ||
              crimeData[j].month === "FEB")
          ) {
            weightedData[i].crimeScore =
              weightedData[i].crimeScore +
              crimeData[j].crime_count * severityWeight;
          }
        }
        break;
      case "spring":
        for (const j in crimeData) {
          if (
            crimeData[j].community_name === communityObjects[i].community &&
            (crimeData[j].month === "MAR" ||
              crimeData[j].month === "APR" ||
              crimeData[j].month === "MAY")
          ) {
            weightedData[i].crimeScore =
              weightedData[i].crimeScore +
              crimeData[j].crime_count * severityWeight;
          }
        }
        break;
      default:
        for (const j in crimeData) {
          if (crimeData[j].community_name === communityObjects[i].community) {
            weightedData[i].crimeScore =
              weightedData[i].crimeScore +
              (crimeData[j].crime_count * severityWeight) /
                monthsBack(crimeData[j].year, crimeData[j].month) ** 2;
          }
        }
        break;
    }
  }
  return weightedData;
}

export function weighTables(
  crimeTables,
  timeWeight,
  severityWeight,
  communityObjects
) {
  const weightedTables = {};
  for (const i in crimeTables) {
    weightedTables[i] = weighCrime(
      crimeTables[i],
      timeWeight,
      severityWeight[i],
      communityObjects
    );
  }
  return weightedTables;
}
