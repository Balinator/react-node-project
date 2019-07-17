import {mongoose} from './mongoDb';
import { Schema, ObjectId } from 'mongoose';

let lessonSchema = new Schema({
    title: String,
    content: String,
    test: ObjectId
});

let Lesson = mongoose.model('Lesson', lessonSchema);

export { Lesson };