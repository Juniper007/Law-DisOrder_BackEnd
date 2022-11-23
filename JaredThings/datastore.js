export function dataSort(data, filters) {
  let communityList = [];
  let communityObjects = [];
  let filteredArrays = {};

  // grabbing a community list out of the raw
  {
    for (const i in data) {
      communityList[i] = data[i].properties.community_name;
    }
    communityList = [...new Set(communityList)];
    communityList.sort();
  }
  // Making an array of objects with {communityname, an empty crime score, latitude, longitude}
  for (const i in communityList) {
    communityObjects[i] = {};
    communityObjects[i].community = communityList[i];
    communityObjects[i].crimeScore = 0;
    for (const j in data) {
      if (data[j].properties.community_name === communityList[i]) {
        communityObjects[i].lat = data[j].properties.lat;
        communityObjects[i].long = data[j].properties.long;
        break;
      }
    }
  }

  // Makes an object with the crime as the key and an array of instances as the value
  {
    for (const i in filters) {
      filteredArrays[filters[i]] = [];
    }
    for (const i in data) {
      let eventClassified = false;
      let event = data[i].properties.category.toLowerCase();
      for (const j in filters) {
        switch (filters[j]) {
          case "assault":
            if (event.includes("assault")) {
              filteredArrays.assault.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "bneStore":
            if (event.includes("break") && event.includes("comm")) {
              filteredArrays.bneStore.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "bneHome":
            if (event.includes("break") && event.includes("dwell")) {
              filteredArrays.bneHome.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "bneOther":
            if (event.includes("break") && event.includes("other")) {
              filteredArrays.bneOther.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "robOfCar":
            if (event.includes("of vehicle")) {
              filteredArrays.robOfCar.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "robFromCar":
            if (event.includes("from vehicle")) {
              filteredArrays.robFromCar.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "robStore":
            if (event.includes("commercial robbery")) {
              filteredArrays.robStore.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "robStreet":
            if (event.includes("street robbery")) {
              filteredArrays.robStreet.push(data[i].properties);
              eventClassified = true;
            }
            break;
          case "violence":
            if (event.includes("violence")) {
              filteredArrays.violence.push(data[i].properties);
              eventClassified = true;
            }
            break;
          default:
            break;
        }
        if (eventClassified) {
          break;
        }
      }
    }
  }
  return [filteredArrays, communityObjects];
}
