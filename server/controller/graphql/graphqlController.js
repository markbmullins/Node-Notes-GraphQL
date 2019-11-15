const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const noteService = require("../../service/NoteService");

  const schema = buildSchema(`
      type Note {
        id: ID
        title: String
        content: String
      }

      type Query {
          getNote(id: ID!): Note
          getNotes: [Note]
      }

      type Mutation {
          createNote(title: String!, content: String): Note
          updateNote(id: ID!, title: String!, content: String): Note
          deleteNote(id: ID!): Boolean
      }
  `);

  const root = {
    getNotes: noteService.getAll(),
    getNote: ({id}) => noteService.getByID(id),
    createNote: ({title, content}) => noteService.create(title, content).then(note => note),
    updateNote: ({id, title, content}) => noteService.update(id, title, content).then(note => note),
    deleteNote: ({id}) => noteService.deleteById(id).then(note => note ? true : false)
  };

const graphql = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphql;