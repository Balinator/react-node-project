import {mongoose} from './mongoDb';
import { Schema, ObjectId } from 'mongoose';

let courseSchema = new Schema({
    name: String,
    description: String,
    homepage: String,
    lessongroups: [{
        id: Number,
        name: String,
        description: String,
        test: ObjectId,
        lessons: [ObjectId]
    }]
});


let Course = mongoose.model('Course', courseSchema);

export { Course };