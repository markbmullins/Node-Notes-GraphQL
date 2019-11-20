const graphqlHTTP = require("express-graphql");
const schema = require("../../schema/graphqlSchema");
const resolvers = require("../resolvers/graphqlResolvers");

module.exports = graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
});
