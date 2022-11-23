import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import DEBUG from 'debug';
let debug = DEBUG('server:mongoose');
debug.enabled = true;

const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.fazjowh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, () => {
    debug(`connected to mongoose on ${connectionString}`)
})
export default mongoose;