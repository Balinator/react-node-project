import mongoose, { Schema, ObjectId } from 'mongoose';

mongoose.connect('mongodb://lynx:lynxweb2019@cluster0-shard-00-00-uz7fo.mongodb.net:27017,cluster0-shard-00-01-uz7fo.mongodb.net:27017,cluster0-shard-00-02-uz7fo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });

/*let curseSchema = new Schema({
    name: String,
    description: String,
    lessongroups: [{
        id: Number,
        name: String,
        description: String,
        test: {
            title: String,
            description: String,
            questions: [{
                id: Number,
                question: String,
                questionType: String,
                correct: [String],
                answers: [String]
            }]
        },
        lessons: [{
            id: Number,
            title: String,
            content: String,
            test: {
                title: String,
                description: String,
                questions: [{
                    id: Number,
                    question: String,
                    questionType: String,
                    correct: [String],
                    answers: [String]
                }]
            }
        }]
    }]
});*/

let courseSchema = new Schema({
    name: String,
    description: String,
    lessongroups: [{
        id: Number,
        name: String,
        description: String,
        test: ObjectId,
        lessons: [ObjectId]
    }]
});
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
let lessonSchema = new Schema({
    title: String,
    content: String,
    test: ObjectId
});

//let Curse = mongoose.model('Curse', curseSchema);
let Course = mongoose.model('Course', courseSchema);
let Test = mongoose.model('Test', testSchema);
let Lesson = mongoose.model('Lesson', lessonSchema);

/*async function oldDatabaseToNewDatabase() {
    let data = await Curse.find();
    

    await data.forEach(async curs => {
        let c = new Course();
        c.name = curs.name;
        c.description = curs.description;
        c.lessongroups = [];
        for(let lessongroupkey in curs.lessongroups){
            let lessongroup = curs.lessongroups[lessongroupkey];
            if(!lessongroup.name || !lessongroup.description){
                continue;
            }
            let lg = {};
            lg.id = lessongroup.id;
            lg.name = lessongroup.name;
            lg.description = lessongroup.description;
            lg.lessons = [];
            for(let lessonkey in lessongroup.lessons) {
                let lesson = lessongroup.lessons[lessonkey];
                if(!lesson.title || !lesson.content){
                    continue;
                }
                let l = new Lesson();
                l.title = lesson.title;
                l.content = lesson.connect;
                if (lesson.test && lesson.test.title && lesson.test.description) {
                    let t = new Test();
                    t.title = lesson.test.title;
                    t.description = lesson.test.description;
                    t.questions = lesson.test.questions;
                    l.test = (await t.save())._id;
                }
                lg.lessons.push((await l.save())._id);
            }

            if (lessongroup.test && lessongroup.test.title && lessongroup.test.description) {
                let t = new Test();
                t.title = lessongroup.test.title;
                t.description = lessongroup.test.description;
                t.questions = lessongroup.test.questions;
                lg.test = (await t.save())._id;
            } else {
                lg.test = null;
            }
            c.lessongroups.push(lg);
        }
        await c.save();
    });
}*/

export { Course, Test, Lesson };