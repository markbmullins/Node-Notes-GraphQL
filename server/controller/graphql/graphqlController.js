const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const noteService = require('../../service/noteService');

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
          deleteNote(id: ID!): Boolean,
          deleteNotes(ids: [ID]!): [Boolean]
      }
  `);

const root = {
    getNotes: () => {
        console.log("called getNotes resolver")
        return noteService.getAll()
    },
    getNote: ({ id }) => {
        return noteService.getByID(id)
    },
    createNote: ({ title, content }) => {
        console.log("called createNote resolver with ", title, content);
        return noteService.create(title, content).then(note => {
            console.log("returned note: ", note);
            return note
        })
    },
    updateNote: ({ id, title, content }) => {
        return noteService.update(id, title, content).then(note => note)
    },
    deleteNote: ({ id }) => {
        return noteService.deleteById(id).then(note => (note ? true : false))
    }
};

const graphql = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
});

module.exports = graphql;
