const express = require('express');
const http = require('http');
const router = express.Router();
const app = express();

app.get('/', (req, res) => {
   res.send('Hello, world');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});