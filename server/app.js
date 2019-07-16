import Koa from "koa";
import cors from "koa-cors";
import serve from "koa-static";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import mount from "koa-mount";
import Router from "koa-router";
import HttpStatus from "http-status";
import fs from 'fs';
import mongoose, { Schema, ObjectId } from 'mongoose';

const app = new Koa();

const router = new Router();

mongoose.connect('mongodb://lynx:lynxweb2019@cluster0-shard-00-00-uz7fo.mongodb.net:27017,cluster0-shard-00-01-uz7fo.mongodb.net:27017,cluster0-shard-00-02-uz7fo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });

let curseSchema = new Schema({
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
let Curse = mongoose.model('Curse', curseSchema);

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

router.get("/api/data", async (ctx, next) => {
  let data = await Curse.find();
  //let rawdata = fs.readFileSync(__dirname + '/data/data.json');
  //let data = JSON.parse(rawdata);
  ctx.status = HttpStatus.OK;
  console.log(data);
  ctx.body = data;
  await next();
});

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/../client/build")); //serve the build directory
app.use(mount("/", static_pages));
app.use(bodyParser());
app.use(logger());
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());
app.use(function* () {
  this.set('Access-Control-Allow-Origin', '*');
});


app.listen(3000);
console.log('Server running in http://localhost:' + (process.env.PORT || 3000))
