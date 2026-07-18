import { model, Schema } from "mongoose";

const schema = new Schema({
    uid: { type: String, required: true },
    id: { type: String, required: true, unique:true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    privacy: { type: String, required: true },
    schedule: { type: String, required: true },
}, { timestamps: true })

const Todos = model('todos', schema)
export { Todos }