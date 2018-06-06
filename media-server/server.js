'use strict';

const express = require('express');

const app = express();
app.use(express.static('images'));

app.listen(3050, () => console.log('Media server is listening on port 3050!'));