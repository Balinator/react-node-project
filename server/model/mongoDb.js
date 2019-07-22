import mongoose, { Schema, ObjectId } from 'mongoose';

mongoose.connect('mongodb://lynx:lynxweb2019@cluster0-shard-00-00-uz7fo.mongodb.net:27017,cluster0-shard-00-01-uz7fo.mongodb.net:27017,cluster0-shard-00-02-uz7fo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });

export {mongoose};