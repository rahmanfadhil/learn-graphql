const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql

let books = [
  { name: 'Learn Javascript', genre: 'tutorial', id: '1' },
  { name: 'Learn React', genre: 'tutorial', id: '2' },
  { name: 'Harry Potter', genre: 'fantasy', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Get data from db
        books.find((item) => item.id === '1')
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery })