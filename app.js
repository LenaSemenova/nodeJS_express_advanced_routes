import express from "express";
import { json, urlencoded } from "express";
import mongoose from "mongoose";

import router from "./routes/routes.js"


const app = express();

const PORT = 6000;

mongoose.connect('mongodb://localhost:27017/advanced-todos').then(() => {
    console.log('Connected to MongoDB Advanced Todos!');
}).catch((err) => {
    console.error('Error while connecting to MongoDB' + err);
})

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/todos', router);

app.get('/', (req, res) => {
    res.redirect('/todos');
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})