import { Router } from 'express';
// import { createSuperhero } from '../db/models/superheroModel.js';
import { User, addNewUser } from '../db/models/user_Model.js';
import { debug } from '../server.js';

const router = Router();

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

  router.get('/login', async (req, res) => {
    const user = req.body;
    debug ('in login route', user);
    try {
    const userValid = await User.logIn(user);
    res.status(200).send(userValid)
    } catch (error) {
        res.status(404).send({error: error.message})
    }

  })