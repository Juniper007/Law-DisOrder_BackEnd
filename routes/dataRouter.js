import { Router } from 'express';
import { debug } from '../express-server.js';
import fetch from 'node-fetch';
import { applyMath } from '../functions/functions.js';

const router = Router();

const weights = {
  assault: 7,
  bneStore: 6,
  bneHome: 8,
  bneOther: 6,
  robStore: 5,
  robStreet: 10,
  robFromCar: 1,
  robOfCar: 7,
  violence: 10
};

router.post('/', async (req, res) => {
  const seasonReq = JSON.parse(req.body.timeFilters);

  const crimeReq = JSON.parse(req.body.crimeFilters);
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
  let crimes = [];
  for (const i in crimeReq) {
    switch (crimeReq[i]) {
      case 'assault':
        crimeReq[i] = '"Assault (Non-domestic)"';
        break;
      case 'bneStore':
        crimeReq[i] = '"Break & Enter - Commercial"';
        break;
      case 'bneHome':
        crimeReq[i] = '"Break & Enter - Dwelling"';
        break;
      case 'bneOther':
        crimeReq[i] = '"Break & Enter - Other Premises"';
        break;
      case 'robStore':
        crimeReq[i] = '"Commercial Robbery"';
        break;
      case 'robStreet':
        crimeReq[i] = '"Street Robbery"';
        break;
      case 'robFromCar':
        crimeReq[i] = '"Theft FROM Vehicle"';
        break;
      case 'robOfCar':
        crimeReq[i] = '"Theft OF Vehicle"';
        break;
      case 'violence':
        crimeReq[i] = '"Violence Other (Non-domestic)"';
        break;
    }
  }
  crimeReq[0] = `category=${crimeReq[0]}`;
  crimes = crimeReq.join(' OR category=');
  const noGoodTerribleString = `(${crimes}) AND (${timeString})`;
  console.log(
    `https://data.calgary.ca/resource/78gh-n26t.json?$WHERE=${noGoodTerribleString}`
  );

  try {
    // fetch request with SoQL query based on outcome of switch statement
    const response = await fetch(
      `https://data.calgary.ca/resource/78gh-n26t.json?$WHERE=${noGoodTerribleString}`
    );
    const rawData = await response.json();
    // console.log(rawData);
    const mapResult = await applyMath(rawData, weights, true);
    // console.log(mapResult);
    res.send(mapResult);
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});
export default router;
