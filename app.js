import express from "express";
import { json, urlencoded } from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import router from "./routes/routes.js"


const app = express();

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/advanced-todos').then(() => {
    console.log('Connected to MongoDB Advanced Todos!');
}).catch((err) => {
    console.error('Error while connecting to MongoDB' + err);
})
app.set('view engine', 'ejs');

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/todos', router);

app.get('/', (req, res) => {
    res.redirect('/todos');
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})