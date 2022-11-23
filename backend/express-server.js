import express from 'express';
// import myConfig from 'dotenv';
import DEBUG from 'debug';

import userRouter from './routes/userRouter.js';
import dataRouter from './routes/dataRouter.js';

// myConfig.config();
export const debug = DEBUG('express-server:routes');
debug.enabled = true;
const port = 5000;
const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/crimeData', dataRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
