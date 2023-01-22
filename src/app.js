const express = require('express');

const app = express();
const port = 3000;
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
// after we moved secret to ".env" file, we need to somehow access it.
// In order to do it we just require(in fact execute) DOTENV package which results in
// adding our own defined ENV variables to "process.env" (which is available by default)
require('dotenv').config();

app.use(express.static('./public'));
app.use(express.json());
// use our own router to manage requests to "/api/v1/tasks"
app.use('/api/v1/tasks', tasksRouter);

const startApp = async () => {
  try {
    // FIRST we connect to DB (we pass secret string from .env)
    await connectDB(process.env.MONGO_URI);
    console.log('CONNECTED TO DATABASE');
    // and only IF we are SUCCESSFUL we start the server
    app.listen(port, () => console.log(`server is running on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

startApp();
