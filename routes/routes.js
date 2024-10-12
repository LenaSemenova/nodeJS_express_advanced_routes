import express from "express";
import { body } from "express-validator";
import { Router } from "express";

import todoControllers from "../controllers/controllers.js";

const router = new Router();

router.get('/', todoControllers.getTodos);

router.post('/', [
    body('title').notEmpty().withMessage('Title is required!'),
    body('description').isLength({ max: 400 }).withMessage('Description cannot be longer than 400 characters!')
],
 todoControllers.createTodos);

router.put('/update/:id', [
    body('saved-todo').notEmpty().withMessage('Title is required!'),
    body('saved-description').isLength({ max: 400 }).withMessage('Description cannot be longer than 400 characters!')
],
 todoControllers.updateTodos);

router.delete('/delete/:id', todoControllers.deleteTodos);

export default router