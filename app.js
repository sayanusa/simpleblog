const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require('./routes');
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});