//   {
//     "type": "FeatureCollection",
//     "features": [
//       {
//         "type": "Feature",
//         "properties": {
//           "community_name": "RUNDLE",
//           "year": "2022",
//           "sector": "NORTHEAST",
//           "resident_count": "11688",
//           "long": "-113.97005811864892",
//           "id": "2022-SEP-RUNDLE-Break & Enter - Commercial",
//           "date": "2022-09-01T00:00:00.000",
//           "category": "Break & Enter - Commercial",
//           "crime_count": "1",
//           "lat": "51.074239973666835",
//           "month": "SEP"
//         },
//         "geometry": {
//           "type": "Point",
//           "coordinates": [-113.970058118649, 51.074239973667]
//         }}]}

export function toGeoJSON(crime_data) {
  const mapFile = { type: "FeatureCollection", features: [] };
  for (const i in crime_data) {
    mapFile.features[i] = {};
    mapFile.features[i].type = "Feature";
    mapFile.features[i].properties = {};
    mapFile.features[i].properties.community = crime_data[i].community;
    mapFile.features[i].properties.crimeScore = crime_data[i].crimeScore;
    mapFile.features[i].geometry = {};
    mapFile.features[i].geometry.type = "Point";
    mapFile.features[i].geometry.coordinates = [
      crime_data[i].long,
      crime_data[i].lat,
    ];
  }
  return mapFile;
}
