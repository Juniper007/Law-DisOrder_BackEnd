import express from "express";
const app = express();
const port = 5000;
app.use(express.json());
//app.use("/user", userRouter)

app.get('/slow', (req, res) => {
    console.log('delay for 3 seconds')
    setTimeout(() => {
        let seconds = new Date().getTime();
        res.send({currentTime: seconds})
    }, 3000)
});



app.listen(port, () => console.log(`Server listening on port ${port}!`));
// export { };