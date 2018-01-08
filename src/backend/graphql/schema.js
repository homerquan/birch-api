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
  token: String
  host: String
  client: String
  createdAt: String
  updatedAt: String
}

type Knowledge {
  id: String
  raw: String
  text: String
  bot: String
  client: String
  createdAt: String
  updatedAt: String
}

type Suggestion {
  id: String
  text: String
  conversation: String
  delay: Int
}

type Query {
  conversations(clientId: String, botId: String): [Conversation]
  messages(conversationId: String, clientId: String): [Message]
  bots(clientId: String): [Bot]
  knowledge(clientId: String, botId: String): Knowledge
}

type Mutation {
  updateConversation(conversationId: String!): Conversation
  createMessage(text: String!, conversationId: String!): Message
  createBot(clientId: String!, name: String!, url: String!): Bot
  updateKnowledge(clientId: String!, botId:String!, text: String!): Knowledge
}

type Subscription {
  createConversation(clientId:String): Conversation
  updateConversation(clientId:String): Conversation
  createMessage(clientId:String): Message
  updateMessage(clientId:String): Message
  receiveSuggestion: String
  createSuggestion(conversationId:String): Suggestion
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`;

export default typeDefs;