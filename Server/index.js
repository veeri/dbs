

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./Router/index.js')


const app = express();
app.use(bodyParser.json())
const port = 5000;
app.use(cors());

app.use(router);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});