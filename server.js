const express = require('express');
const dotenv = require('dotenv');
const app = express();
const {connectDB} = require('./db');

dotenv.config();
connectDB();

app.get('/', (req, res) => {
    res.json({msg: 'Hello world'})
});

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
})