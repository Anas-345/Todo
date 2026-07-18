import { model, Schema } from "mongoose";

const schema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

const Users = model('users', schema)
export { Users }