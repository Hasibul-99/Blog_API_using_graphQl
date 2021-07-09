// Import required stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const {users, user, posts, post } = require('./queries');

// Import mutations
const {register, login, addPost} = require('./mutation');


// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { users, user, posts, post }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: "Mutations",
    fields: {register, login, addPost}
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});