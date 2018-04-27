## TODOs

* Auth logic 
  * ref: https://github.com/srtucker22/chatty/ (server)



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