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

const advancedTodosModel = mongoose.model('AdvancedTodo', advancedTodosSchema);

export default advancedTodosModel;