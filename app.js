import express from "express";
import { json, urlencoded } from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
//import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import handler from "./for_check.js";

import dotenv from "dotenv";
dotenv.config();

import router from "./routes/routes.js"


const app = express();

const PORT = process.env.PORT || 3000;
//const PORT = 3000;
const mongoUri = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Successfully connected to DB!');
    } catch(err) {
        console.error('Error while connecting to MongoDB' + err);
        process.exit(1);
    }
}
connectDB();
/*mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB Advanced Todos!');
}).catch((err) => {
    console.error('Error while connecting to MongoDB' + err);
    process.exit(1);
})
*/
app.set('view engine', 'ejs');

//app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/todos', router);

app.get('/', async (req, res) => {
     await handler();
     res.redirect('/todos');
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})