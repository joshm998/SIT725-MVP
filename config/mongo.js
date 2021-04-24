const Mongoose = require('mongoose');
const config = require('./config');

Mongoose.Promise = global.Promise;
Mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const mongo = Mongoose.connection;

mongo.on('error', () => {
  console.log(`MongoDB connection has failed ${config.database.url}, Check if MongoDB is Currently Running.`);
  process.exit();
});

mongo.once('open', () => {
  console.log('MongoDB connection successful obtained.');
});

module.exports = mongo;