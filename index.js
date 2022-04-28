// require or import
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());


//get root
app.get('/', (req, res) => {
    res.send('Hello world from the backend');
})

//listen
app.listen(port, () => {
    console.log('yea! I can hear.');
})