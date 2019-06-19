require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const route = require('./route');
const cors = require('cors');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

const whitelist = [undefined];

const corsOption = {
    origin: function (origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOption));

route(app);

app.listen(port);
console.log('server started on localhost:' + port);