## TODOs

* Auth logic 
  * ref: https://github.com/srtucker22/chatty/ (server)

## Mock

* `graphql-faker ./console-api-mock.grqphql -p 8003`
* Mock reference https://github.com/APIs-guru/graphql-faker/blob/master/src/fake_definition.graphql
* Pagination, edges, connections 
  * https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976

## Test
Using REPL of graphQL
https://github.com/graphql-cli/graphql-cli

Using /graphiql

```
query {
  conversations(clientId:"ddcd39c9-dcbc-4a26-bcf7-525d77c12d54") {
    id
    visitor
    client
    mode
    updatedAt
  }
}
```
An example with variable:

```
subscription onUpdateConversation($clientId:String) {
  updateConversation(clientId:$clientId) {
    id
    status
  } 
}
```
using variable:
```
{
  "clientId": "ddcd39c9-dcbc-4a26-bcf7-525d77c12d54"
}
```

with pagination:
```
query {
  conversations {
    id
     messagesConnection(first:2){
      edges {
        cursor
        node {
          id
          source
          text
        }
      }
    }
  }
}

query {
 NotificationsFeed(clientId:"abc") {
  notifications(first:1,last:10){
    totalCount
    edges{
      node {
        id
        text
      }
    }
    pageInfo{
      hasNextPage
      endCursor
    }
  }
 }
}
```

```
mutation {
  userCreate(record: {
    name: "My Name",
    age: 24,
    gender: ladyboy,
    contacts: {
      email: "mail@example.com",
      phones: [
        "111-222-333-444",
        "444-555-666-777"
      ]
    },
    languages: [{
      language: "english",
      skill: basic
    }],
    someMixed: {
      a: 1,
      b: 2,
      c: [ 1, 2, 3, true, false, { sub: 1 }]
    }
  }) {
    recordId
    record {
      name
      age
      gender
      languages {
        language
      }
      contacts {
        email
        phones
      }
      someMixed
    }
  }
}
```

```
query{
  userPagination(filter: { status: online }, perPage: 2, page: 2, sort: _ID_ASC) {
    items {
      name
    }
    count
    pageInfo {
      currentPage
      perPage
      itemCount
      pageCount
      hasPreviousPage
      hasNextPage
    }
  }
}
```

## Code generator

https://github.com/graphql-compose/graphql-compose-mongoose
https://graphql-code-generator.com/

## Test 

prisma-admin localhost:8003

## Permission

graphql-shield

