import advancedTodosModel from "../db_model/db_model_mongoose.js";
import { validationResult } from "express-validator";

//GET DATA

const getTodos = async(req, res) => {
    try  {
        const todos = await advancedTodosModel.find();
        console.log(todos);
        //res.status(200).json({messageGet: "It's okay", "yourTodos": todos});
        res.render('index', { todos })
    } catch(err) {
        res.status(500).send(err);
    }
}

// CREATE DOCUMENTS

const createTodos = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const todos = await advancedTodosModel.find();
        const errArr = errors.array();
        return res.status(400).render('index', { todos, errArr });
    }
    
    const { title, description } = req.body;
    const newTodo = new advancedTodosModel({
        title,
        description,
        completed: false
    })
  
    try {
    const resultOfCreating = await newTodo.save();
    if (resultOfCreating._id) {
        console.log('Document created!' + resultOfCreating._id);
        res.redirect('/todos');
        }
    } catch(err) {
        res.status(500).send(err);
    }
}

//UPDATE DOCUMENTS

const updateTodos = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const todos = await advancedTodosModel.find();
        const errArr = errors.array();
        return res.status(400).render('index', { todos, errArr });
    }

    const { id } = req.params;
    //const { title, description, completed } = req.body;
    const updatedTitle = req.body['saved-todo'];
    const updatedDescription = req.body['saved-description'];
    const updatedCompleted = req.body['completed'];
    

    console.log("id:" + id);
    console.log("document " + updatedTitle, updatedDescription, updatedCompleted);

    let update = {};

    if (updatedTitle!== undefined) {
        update.title = updatedTitle;
    }
    if (updatedDescription !== undefined) {
        update.description = updatedDescription;
    }
    if (updatedCompleted === 'on') {
        update.completed = true;
    } else {
        update.completed = false;
    }

    
    console.log(update);

    try {
        await advancedTodosModel.findOneAndUpdate(
            { _id : id },
            update
            //{ title, description, completed: completed === 'on'}
        );
        res.redirect('/todos');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// DELETING DOCUMENTS FROM DB

const deleteTodos = async(req, res) => {
    const { id } = req.params;

    try {
        const resultOfDeleting = await advancedTodosModel.findByIdAndDelete(id);
        console.log(resultOfDeleting);
        res.redirect('/todos');
    } catch(err) {
        res.status(500).send(err);
    }
}

//const req = { params: { id: '66f535fab42440e0ce1a5734'}, body: { description: "Sending another POST request using cURL / test test * 2", completed: false}};
//const res = { json: (data) => console.log(data)};

//updateTodos(req, res);

export default {getTodos, createTodos, updateTodos, deleteTodos}
