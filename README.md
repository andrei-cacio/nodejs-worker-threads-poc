### Quick usage:

```
npm i

node index.js
```

ℹ️ Adjust the 2nd loop number of iterations to test out different outcomes

## Endpoints to curl:

| route   |      technology used      |  ✅ pros | ❌ cons |
|----------|:-------------:|:------:|:------:|
| `/spin` |  uses Snyk's `EventLoop spinner class` to unblock the Event Loop when heavy CPU tasks are processed  | server can accept incoming requests and evnet loop is not blocked | heavy tasks add up time on other tasks being processed |
| `/threaded` |    uses `node worker-threads` to do parallel work for CPU bound tasks   |   consistency on processing time, event loop kept healthy | thread orchestration logic, more code complexity |
| `/async` | uses a simple `Promise based` approach to handle CPU bound tasks |    simple solution for I/O bound operations | not suited for CPU bound tasks resulting in event loop being blocked |
