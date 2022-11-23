import crimeData from "./crime_data.geojson" assert { type: "json" };
import { weighTables } from "./dataweight.js";
import { dataSort } from "./datastore.js";
import { sumAndNormalize } from "./sumAndNormalize.js";
import { toGeoJSON } from "./toGeoJSON.js";
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
const weights = {
  assault: 7,
  bneStore: 6,
  bneHome: 8,
  bneOther: 6,
  robStore: 5,
  robStreet: 10,
  robFromCar: 1,
  robOfCar: 7,
  violence: 10,
};

for (const i in weights) {
  weights[i] = 1;
}

const filters = [
  "assault",
  "bneStore",
  "bneHome",
  "bneOther",
  "robStore",
  "robStreet",
  "robFromCar",
  "robOfCar",
  "violence",
];
const timeWeight = "";
const [filteredArrays, communityObjects] = dataSort(
  crimeData.features,
  filters
);
const weightedTables = weighTables(
  filteredArrays,
  timeWeight,
  weights,
  communityObjects
);
const [normalizedTables, summedTables] = sumAndNormalize(
  weightedTables,
  filters,
  communityObjects
);

const objectToMap = toGeoJSON(normalizedTables);
console.log(summedTables[68], normalizedTables[68]);
console.log(summedTables[161], normalizedTables[161]);
console.log(objectToMap);
