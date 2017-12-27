const typeDefs = `

type Conversation {
  id: String
  visitor: String
  bot: String
  client: String
  mode: String
  token: String
  createdAt: String
  updatedAt: String
}

type Message {
  id: String
  text: String
  source: String
  sourceId: String
  destination: String
  destinationId: String
  bot: String
  client: String
  createdAt: String
  updatedAt: String
}

type Bot {
  id: String
  name: String
  host: String
  client: String
  createdAt: String
  updatedAt: String
}

type Query {
  test: String
  now: String
  conversations(clientId: String, botId: String): [Conversation]
  messages(conversationId: String, clientId: String): [Message]
  bots(clientId: String): [Bot]
}

type Mutation {
  updateConversation(conversationId: String!): Conversation
  addMessage(text: String!, conversationId: String!): Message
}

type Subscription {
  now: String
  nowWithFilter(userId:String): String
  conversationAdded(clientId:String): Conversation
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default typeDefs;