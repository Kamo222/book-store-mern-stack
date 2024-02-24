import "./config.js";
import express, { request } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// dotenv.config();
// require('dotenv').config()

const PORT = process.env.PORT;
const mongoDbURL = process.env.MONGO_DB_URL; 

const app = express();

//Middleware for parsing request boby

app.use(express.json())

//Middleware for handling CORS Policy
    //Option 1: Allow all origins with default of cors(*)
    app.use(cors());
    //Option 2: Allow customs origins
    // app.use(cors({
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     allowedHeaders: ["Content-Type"]
    // }));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send({
        name: "Kamo",
        age: 25
    })
})

app.use("/books", booksRoute);

mongoose.connect(mongoDbURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening at port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })