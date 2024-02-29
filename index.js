import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express()

//Middleware for parsing request body
app.use(express.json())

app.get("/", (request, response)=>{
    console.log(request);
    return response.status(234).send("Welcome to my proyect")
})

// Route to save a new book
app.post("/books", async(request, response)=>{
try{
    if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear ){
        return response.status(400).send({
            message: "Send all required fields",
        });
    }
    const newBook = {
        title: request.body.title ,
        author:  request.body.author,
        publishYear:  request.body.publishYear,
    }

    const book = await Book.create(newBook);
    await Book.create(newBook);

}catch(error){
console.log(error.message);
response.status(500).send({message: error.message})
}
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App conected to DB');
        app.listen(PORT, ()=>{
            console.log(`connected to ${PORT}`)
        })

    })
    .catch(()=>{
        console.log(error);
    })