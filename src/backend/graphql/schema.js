const typeDefs = `

type Intention {
  name: String
  score: Int
}

type Action {
  source: String
  name: String
  status: String
}

type Conversation {
  id: String
  visitor: String
  bot: String
  client: String
  status: String
  mode: String
  intentions: [Intention]
  actions: [Action]
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
  knowledge(clientId: String, botId: String): String
}

type Mutation {
  updateConversation(conversationId: String!): Conversation
  createMessage(text: String!, conversationId: String!): Message
  updateKnowledge(text: String): String
}

type Subscription {
  now: String
  nowWithFilter(userId:String): String
  createConversation(clientId:String): Conversation
  updateConversation(clientId:String): Conversation
  createMessage(clientId:String): Message
  updateMessage(clientId:String): Message
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default typeDefs;