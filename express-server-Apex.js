import express from "express";
import userRouter from './routes/userRouter.js'
const app = express();
const port = 5000;
app.use(express.json());
app.use("/user", userRouter)

// app.get('/slow', (req, res) => {
//     console.log('delay for 3 seconds')
//     setTimeout(() => {
//         let seconds = new Date().getTime();
//         res.send({currentTime: seconds})
//     }, 3000)
// });

app.get('/all', async (req, res) => {
 let data = await fetch('https://data.calgary.ca/resource/78gh-n26t.json')
 res.send(data.body)
})

app.get('/hasfilters', async(req, res) => {
    let filters = res.body.filters();
    if (filters === 'season') {
        searchbyseason()
    }
})



app.listen(port, () => console.log(`Server listening on port ${port}!`));
// export { };