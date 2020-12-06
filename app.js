const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler')
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});