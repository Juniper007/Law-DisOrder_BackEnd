import { Router } from 'express';
import { debug } from '../express-server.js';

const router = Router();

router.post('/', async (req, res) => {
  const seasonReq = JSON.parse(req.body.timeFilters);

  const userFilters = JSON.parse(req.body.crimeFilters);
  console.log(seasonReq, userFilters);
  debug('in fetch route', req.body);

  let months = [];
  for (const i in seasonReq) {
    //season switch
    switch (seasonReq[i]) {
      case 'winter':
        months = months.concat(['"DEC"', '"JAN"', '"FEB"']);
        break;
      case 'spring':
        months = months.concat(['"MAR"', '"APR"', '"MAY"']);
        break;
      case 'summer':
        months = months.concat(['"JUN"', '"JUL"', '"AUG"']);
        break;
      case 'fall':
        months = months.concat(['"SEP"', '"OCT"', '"NOV"']);
        break;
      default:
        if (months === []) {
          months.concat([
            '"DEC"',
            '"JAN"',
            '"FEB"',
            '"MAR"',
            '"APR"',
            '"MAY"',
            '"JUN"',
            '"JUL"',
            '"AUG"',
            '"SEP"',
            '"OCT"',
            '"NOV"'
          ]);
        }
    }
  }
  months[0] = `month=${months[0]}`;
  const timeString = months.join(' OR month=');
  console.log(timeString);
  // TODO
  // if (timeFilters !== "summer") {
  //   timeFilters = "summer";
  // }
  // for (const i in crimeFilters) {
  //   switch (crimeFilters[i]) {
  //     case "assault":
  //       crimeFilters[i] = "Assault (Non-domestic)";
  //       break;
  //     case "bneStore":
  //       crimeFilters[i] = "Break & Enter - Commercial";
  //       break;
  //     case "bneHome":
  //       crimeFilters[i] = "Break & Enter - Dwelling";
  //       break;
  //     case "bneOther":
  //       crimeFilters[i] = "Break & Enter - Other Premises";
  //       break;
  //     case "robStore":
  //       crimeFilters[i] = "Commercial Robbery";
  //       break;
  //     case "robStreet":
  //       crimeFilters[i] = "Street Robbery";
  //       break;
  //     case "robFromCar":
  //       crimeFilters[i] = "Theft FROM Vehicle";
  //       break;
  //     case "robOfCar":
  //       crimeFilters[i] = "Theft OF Vehicle";
  //       break;
  //     case "violence":
  //       crimeFilters[i] = "Violence Other (Non-domestic)";
  //       break;
  //   }
  // }
  // join(' OR ')
  // category=${userFilters}&month=${season}
  console.log(`https://data.calgary.ca/resource/78gh-n26t.json?where=in(category, '${userFilters}')'
)`);

  try {
    const rawData = await fetch(
      `https://data.calgary.ca/resource/78gh-n26t.json?WHERE=${noGoodTerribleString}`
    );
    // const theResult = await applyMath(rawData.body);
    res.send(rawData);
    // fetch request with SoQL query based on outcome of switch statement
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});
export default router;
