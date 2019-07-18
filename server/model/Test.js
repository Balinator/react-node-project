import {mongoose} from './mongoDb';
import { Schema, ObjectId } from 'mongoose';

let testSchema = new Schema({
    title: String,
    description: String,
    questions: [{
        id: Number,
        question: String,
        questionType: String,
        correct: [String],
        answers: [String]
    }]
});
let Test = mongoose.model('Test', testSchema);

export { Test };