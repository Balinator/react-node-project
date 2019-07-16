import mongoose , { Schema, ObjectId } from 'mongoose';

mongoose.connect('mongodb://lynx:lynxweb2019@cluster0-shard-00-00-uz7fo.mongodb.net:27017,cluster0-shard-00-01-uz7fo.mongodb.net:27017,cluster0-shard-00-02-uz7fo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });

let courseSchema = new Schema({
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
});

let Course = mongoose.model('Course', courseSchema);

/*async function initData() {
  let Schema = mongoose.Schema;
  let curseSchema = new Schema({
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
    id: Number,
    title: String,
    content: String,
    test: ObjectId
  });

  let Curse = mongoose.model('Curse', curseSchema);
  //let Test = mongoose.model('Test', testSchema);
  //let Lesson = mongoose.model('Lesson', lessonSchema);
  let rawdata = fs.readFileSync(__dirname + '/data/data.json');
  let data = JSON.parse(rawdata);
  data.forEach(async curs => {
    /*await curs.lessongroups.forEach(async lessongroup => {
      let lessons = [];
      await lessongroup.lessons.forEach(async lesson => {
        if(lesson.test) {
          let t = new Test(lesson.test);
          lesson.test = (await t.save())._id;
        }
        let l = new Lesson(lesson);
        lessons.push((await l.save())._id);
      });
      lessongroup.lessons = lessons;
      if(lessongroup.test) {
        let t = new Test(lessongroup.test);
        let tt = (await t.save());
        console.log(tt);
        lessongroup.test = tt._id;
      } else {
        lessongroup.test = null;
      }
    });
    let c = new Curse(curs);
    await c.save();
  });
}
initData();*/

export default { Course };