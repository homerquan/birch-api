## TODOs

* Auth logic 
  * ref: https://github.com/srtucker22/chatty/ (server)

## Mock

* `graphql-faker ./console-api-mock.grqphql -p 8003`
* Mock reference https://github.com/APIs-guru/graphql-faker/blob/master/src/fake_definition.graphql
* Pagination, edges, connections 
  * https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976

## Test

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

An example of pagination

```
query {
  conversations {
    id
    messageFeed(cursor:"xzsdfasdf"){
      cursor
      messages{
        id
      }
    }
  }
}
```