import express from "express";
import myConfig from 'dotenv';
import DEBUG from 'debug';

import userRouter from './routes/userRouter.js'

myConfig.config();
export const debug = DEBUG('server:routes');
debug.enabled = true;
const port = 5000;
const app = express();

app.use(express.json());

app.get('/slow', (req, res) => {
    console.log('delay for 3 seconds')
    setTimeout(() => {
        let seconds = new Date().getTime();
        res.send({currentTime: seconds})
    }, 3000)
});

app.use("/api/user", userRouter)


app.listen(port, () => console.log(`Server listening on port ${port}!`));