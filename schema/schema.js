const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

let books = [
  { name: 'Learn Javascript', genre: 'tutorial', id: '1', authorId: '1' },
  { name: 'Robocop', genre: 'sci-fi', id: '2', authorId: '2' },
  { name: 'Harry Potter', genre: 'fantasy', id: '3', authorId: '3' },
  { name: 'Poseidon', genre: 'fantasy', id: '4', authorId: '2' },
  { name: 'Dilan', genre: 'romance', id: '5', authorId: '3' }
]

let authors = [
  { name: 'John Doe', age: '18', id: '1' },
  { name: 'Michael Bay', age: '19', id: '2' },
  { name: 'Rahman Fadhil', age: '20', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    id: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent)
        return authors.find(i => i.id === parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent)
        return books.filter(i => i.authorId === parent.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Get data from db
        return books.find((item) => item.id === args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(item => item.id === args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        authors.push({ name: args.name, age: args.age })
        return { name: args.name, age: args.age }
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })