import express from 'express'

const PORT = 6000;
const app = express();


app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`)
})