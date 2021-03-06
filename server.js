const express = require('express');
const dotenv = require('dotenv');
const app = express();
const {connectDB} = require('./db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticate } = require("./middleware/auth");

dotenv.config();
connectDB();

app.use(authenticate);

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to Graphql Blog'})
});

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
})