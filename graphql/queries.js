const { graphql, GraphQLList, GraphQLID } = require("graphql");
const { UserType, PostType, CommentType } = require("./types");
const {User, Post, Comment} = require("../models");

const users = {
    type: new GraphQLList(UserType),
    description: "Retrieves list of users",
    resolve(parent, args) {
      return User.find()
    },
}

const user = {
    type: UserType,
    description: "Retrieves One user",
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return User.findById(args.id);
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: "Retrives list of Posts",
    resolve (parent, args) {
        return Post.find();
    }
}

const post = {
    type: PostType,
    description: "Retrieves One post",
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Post.findById(args.id);
    }
}

const comments = {
    type: new GraphQLList(CommentType),
    description: "Retrives list of Comments",
    resolve (parent, args) {
        return Comment.find();
    }
}

const comment = {
    type: CommentType,
    description: "Retrieves One comment",
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Comment.findById(args.id);
    }
}

module.exports = { users, user, posts, post, comments, comment }
