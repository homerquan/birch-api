const typeDefs = `

type Conversation {
  id: ID
  visitor: String
  bot: String
  client: String
  mode: String
  token: String
  createdAt: String
  updatedAt: String
}

type Query {
  test: String
  conversations(client: String!): [Conversation]
}

type Mutation {
  updateConversation(id: ID!): Conversation
}

type Subscription {
  conversationUpdated(id: ID!): Conversation
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default typeDefs;