const { UserType } = require('./types');

const {} = require('../models');
const { GraphQLString } = require('graphql');
const User = require('../models/User');
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

module.exports = {register, login};