const { buildSchema } = require("graphql");

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

module.exports = schema;
