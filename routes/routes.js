import express from "express";
import { Router } from "express";

import todoControllers from "../controllers/controllers.js";

const router = new Router();

router.get('/', todoControllers.getTodos);

router.post('/', todoControllers.createTodos);

router.put('/update/:id', todoControllers.updateTodos);

router.delete('/delete/:id', todoControllers.deleteTodos);

export default router