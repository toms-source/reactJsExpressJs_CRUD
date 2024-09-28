const express = require("express");
const cors = require("cors");
const userRoutes = require('./Routes/UserRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);

app.listen (8001, () => {
    console.log("port 8001 is open!");
})