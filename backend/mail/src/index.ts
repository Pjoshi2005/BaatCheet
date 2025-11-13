import express from 'express';
import dotenv from 'dotenv';
import { startSendOtpConsumer } from './consumer.js';

dotenv.config();

startSendOtpConsumer();

const PORT = process.env.PORT

const app = express()

app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`)
})