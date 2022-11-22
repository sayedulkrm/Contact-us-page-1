const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const router = require("./router");



const port = 8006;



app.use(express.json());
app.use(cors());
app.use(router);





app.listen(port,() => {
    console.log(`server is running: ${port}`)
})

