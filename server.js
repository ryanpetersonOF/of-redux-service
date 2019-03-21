const {launch} = require('hadouken-js-adapter');

const express = require("express");
const app = express();
const port = 9000;

app.use(express.static('dist'));

app.listen(port, ()=> {
    console.log("Server running on port " + port);
    console.log("Starting service demo");
    launch({manifestUrl: `http://localhost:${port}/standard-service.json`}).catch(console.error);
})