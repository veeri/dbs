

const express = require('express')
const dotenv = require('dotenv')
const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV.trim()}` : ".env"
dotenv.config({ path: env })

const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./Router/index.js')



const app = express();
app.use(bodyParser.json())
app.use(cors());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Now listening on port ${process.env.PORT}`); 
});