import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import {createClient} from 'redis'
import { connectRabbitMQ } from './config/rabbitmq.js';

dotenv.config();

connectDb();

connectRabbitMQ()

export const redisClient = createClient({
    url : process.env.REDIS_URL!,
})

redisClient.connect().then( () =>{console.log("Redis connected successfully")}).catch(console.error)
const app = express();

const port = 5000;

app.listen(port , () => {
    console.log(`server is running on ${port}`)
})