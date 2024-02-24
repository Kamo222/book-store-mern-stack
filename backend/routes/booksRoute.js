import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Getting all books

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

//Getting book by id

router.get("/:id", async (request, response) => {
    try {

        const  { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

//Creating book

router.post("/", async (request, response ) => {
    try {
        if ( !request.body.title || !request.body.author || !request.body.publishYear ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {

    }
})

// Updating book
router.put("/:id", async (request, response) => {
    
    try {
        
        if(!request.body.title || !request.body.author || !request.body.publishYear ){
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({
                message: "Book not found"
            })
        } else {
            return response.status(200).json({message: "Book updated successfully"});
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = Book.findByIdAnddDelete(id);

        if(!result){
            return response.status(500).json({ message: "Book not found"});
        }
        return response.status(200).json({message: "Deleted successfully"})

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message})
    }
})

export default router;