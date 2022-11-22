import { Router } from 'express';
// import { User, addNewUser } from '../db/models/user_Model.js';
import { debug } from '../server.js';

const router = Router();

router.post('/crimeData', async (req, res) => {
  const seasonReq = req.body.season;

  const userFilters = req.body.filters;
  
  debug('in fetch route', req.body);
  
  //season switch
  const season = '';
  switch (seasonReq) {
    case 'winter':
      season = 'DEC, JAN, FEB';
      break;
    case 'spring':
      season = 'MAR, APR, MAY';
      break;
    case 'summer':
      season = 'JUN, JUL, AUG';
      break;
    case 'fall':
      season = 'SEPT, OCT, NOV';
      break;
    default:
        season= 'DEC, JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEPT, OCT, NOV'
  }

  try {
    const seasonResult = await fetch(
      `https://data.calgary.ca/resource/78gh-n26t.json?where=in(category, '${userFilters}')&where=in(month, '${season}'`
    );
    const theResult = await applyMath(seasonResult.body);
    res.send(seasonResult);
    // fetch request with SoQL query based on outcome of switch statement
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});

router.post('/newuser', async (req, res) => {
  const user = req.body;
  debug('in create route', user);
  try {
    const newUser = await addNewUser(user);
    res.send(newUser);
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});

//   router.get('/login', async (req, res) => {
//     const user = req.body;
//     debug ('in login route', user);
//     try {
//     const userValid = await User.logIn(user);
//     res.status(200).send(userValid)
//     } catch (error) {
//         res.status(404).send({error: error.message})
//     }

//   })
