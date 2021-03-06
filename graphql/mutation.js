const { UserType, PostType, CommentType } = require('./types');

const {Post, User, Comment} = require('../models');
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

const updatePost = {
    type: PostType,
    description: "Update blog post",
    args: {
      id: { type: GraphQLString },
      title: { type: GraphQLString },
      body: { type: GraphQLString },
    },
    async resolve(parent, args, { verifiedUser }) {
      if (!verifiedUser) {
        throw new Error("Unauthenticated")
      }

      console.log("verifiedUser", verifiedUser);

      const postUpdated = await Post.findOneAndUpdate(
        {
          _id: args.id,
          authId: verifiedUser._id,
        },
        { title: args.title, body: args.body },
        {
          new: true,
          runValidators: true,
        }
      )
  
      if (!postUpdated) {
        throw new Error("No post with the given ID found for the author")
      }
  
      return postUpdated
    },
}

const deletePost = {
    type: GraphQLString,
    description: "Delete post",
    args: {
      postId: { type: GraphQLString },
    },
    async resolve(parent, args, { verifiedUser }) {
      console.log(verifiedUser)
      if (!verifiedUser) {
        throw new Error("Unauthenticated")
      }
      const postDeleted = await Post.findOneAndDelete({
        _id: args.postId,
        authId: verifiedUser._id,
      })
      if (!postDeleted) {
        throw new Error("No post with the given ID found for the author")
      }
  
      return "Post deleted"
    },
}
  

const addComment = {
    type: CommentType, 
    description: "create new comment on the blog post",
    args: {
        comment: {type: GraphQLString},
        postId: {type: GraphQLString}
    },
    resolve (parent, args, {verifiedUser}) {
        if (!verifiedUser) {
            throw new Error("Unautherized")
        }

        const comment = new Comment({
            comment: args.comment,
            postId: args.postId,
            userId: verifiedUser._id
        });

        return comment.save();
    }
}

module.exports = {register, login, addPost, updatePost, deletePost, addComment};