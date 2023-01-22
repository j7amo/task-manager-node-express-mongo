// We will be using MongoDB for this project.
// MongoDB is a schema-less NoSQL document database.
// It means you can store JSON documents in it, and the structure of these documents
// can vary as it is not enforced like SQL databases. This is one of the advantages
// of using NoSQL as it speeds up application development and reduces the complexity of deployments.

// We will not work with MongoDB API directly BUT we will use Mongoose.
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation,
// and is used to TRANSLATE BETWEEN OBJECTS IN CODE
// and the REPRESENTATION OF THOSE OBJECTS IN MongoDB DATABASE.

// so in order to start we need to require "mongoose":
const mongoose = require('mongoose');

// and set up some connection logic:
const connectDB = (url) => mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = connectDB;
