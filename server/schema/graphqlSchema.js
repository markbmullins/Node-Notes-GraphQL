const { buildSchema } = require("graphql");

const schema = buildSchema(`
      type Note {
        id: ID
        title: String
        content: String
        order: Int
      }

      type Query {
          getNote(id: ID!): Note
          getNotes: [Note]
      }

      type Mutation {
          createNote(title: String, content: String, order: Int): Note
          updateNote(id: ID!, title: String, content: String, order: Int): Note
          deleteNote(id: ID!): ID,
          deleteNotes(ids: [ID]!): [Boolean]
      }
  `);

module.exports = schema;
