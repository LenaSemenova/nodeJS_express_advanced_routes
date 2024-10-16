import mongoose from "mongoose";

const advancedTodosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const advancedTodosModel = mongoose.model('Todo', advancedTodosSchema);

export default advancedTodosModel;