const express = require('express');

const app = express();
// if we deploy our app then it is highly likely that PORT value will be dynamic,
// so the common practice is to first try and get the value from the "process.env.PORT"
// and if there is no value then use some fallback value:
const PORT = process.env.PORT || 3000;
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
// after we moved secret to ".env" file, we need to somehow access it.
// In order to do it we just require(in fact execute) DOTENV package which results in
// adding our own defined ENV variables to "process.env" (which is available by default)
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handlers');

app.use(express.static('./public'));
app.use(express.json());
// use our own router to manage requests to "/api/v1/tasks"
app.use('/api/v1/tasks', tasksRouter);
// here we use our own middleware to do something in case there is no matching resource:
app.use(notFound);
// middleware that handles errors should be placed at the end of the middleware chain
// OR if we have something like "app.get" - after it
app.use(errorHandler);

const startApp = async () => {
  try {
    // FIRST we connect to DB (we pass secret string from .env)
    await connectDB(process.env.MONGO_URI);
    console.log('CONNECTED TO DATABASE');
    // and only IF we are SUCCESSFUL we start the server
    app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

startApp();
