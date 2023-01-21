const express = require('express');

const app = express();
const port = 3000;
const tasksRouter = require('./routes/tasks');

// app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasksRouter);

app.listen(port, () => console.log(`server is running on port ${port}...`));
