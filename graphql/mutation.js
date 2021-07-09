const { UserType, PostType } = require('./types');

const {Post, User} = require('../models');
const { GraphQLString } = require('graphql');
const {createJwtToken} = require("../util/auth");

const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        displayName: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const {username, email, password, displayName} = args;
        const user = new User({username, email, password, displayName});
        
        await user.save();

        const token = createJwtToken(user)
        return JSON.stringify(token);
    }
}

const  login = {
    type: GraphQLString,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    async resolve(parent, args) {

        console.log("args00",args);
        const user = await User.findOne({email: args.email}).select("+password");

        console.log("user", user);

        if (!user || user.password !== args.password) {
            throw new Error("Invalied Credentials!")
        }

        const token = createJwtToken(user);
        return token;
    }
}

const addPost = {
    type: PostType,
    description: "Create new blog post",
    args: {
      title: { type: GraphQLString },
      body: { type: GraphQLString },
    },
    resolve(parent, args, { verifiedUser }) {
      console.log("Verified User: ", verifiedUser)
      if (!verifiedUser) {
        throw new Error("Unauthorized")
      }
  
      const post = new Post({
        authId: verifiedUser._id,
        title: args.title,
        body: args.body,
      })
  
      return post.save()
    },
  }

module.exports = {register, login, addPost};