const mongoose = require('mongoose');

// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the SHAPE
// of the documents(database records) within that collection.

// here we define Schema(description of the structure/shape) for a Task object:
const TaskSchema = new mongoose.Schema({
  // Each key in "TaskSchema" defines a property in our documents
  // which will be cast to its associated SchemaType (e.g. property "name"
  // will be cast to "String" type). This structure also helps us CONTROL
  // WHAT IS ADDED TO DB.
  // This basically means 2 things:
  // 1) ONLY those PROPERTIES that are DEFINED IN the SCHEMA will be added
  // to DB(e.g. we decide to add a record to the DB with such props:
  // { "name": "bla bla bla", "completed": true, "date": new Date() } and as a result "date"
  // WILL NOT BE ADDED!)
  // 2) if the provided value is incorrect(i.e. that it CAN NOT BE CAST to specified SchemaType)
  // then VALIDATION will FAIL and the record/document WILL NOT BE ADDED TO DB(e.g. we try to add
  // { "name": "bla bla bla", "completed": "completed" } and in this case "completed"
  // can not be cast to a "Boolean". In order for it to be cast to Boolean it can only have
  // values like "true", true, "false", false ). But this validation is very-very basic which
  // means that out-of-the-box it DOES NOT CARE validating empty values for example...
  name: String,
  completed: Boolean,
});

// To use our schema definition, we need to convert our "TaskSchema"
// into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
module.exports = mongoose.model('Task', TaskSchema);
// The first argument is the SINGULAR name of the collection our model is for.
// Mongoose automatically looks for the PLURAL, lowercased version of our model name.
// Thus, for the example above, the model "Task" is for the "tasks" collection in the database.

// MODELS are constructors compiled from Schema definitions.
// An instance of a model is called a DOCUMENT(so we need to instantiate first!).
// Models are responsible for creating and reading documents from the underlying MongoDB database.
// So basically MODEL is a representation of underlying DB record here.
