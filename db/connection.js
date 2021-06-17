const mongoose = require("mongoose");
const { DB_HOST, DB_USER, DB_PWD, DB_NAME } = require('./../utils/constants');

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to DB");

  require('./initializer');
});