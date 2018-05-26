const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}))

app.listen(8000, () => console.log('listening to port 8000'))