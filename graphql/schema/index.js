const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Product {
  _id: ID!
  name: String!
  quantity: Int!
  description: String!
  price: Float!
}

input ProductInput {
  name: String!
  quantity: Int!
  description: String!
  price: Float!
}

type RootQuery {
  products: [Product!]!
}

type RootMutation {
  createProducts(productInput: ProductInput): Product
  deleteProduct(id: ID!): String
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
