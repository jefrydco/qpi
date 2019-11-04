QPI
===

Yet another http framework for NodeJS

# Quick Start

```js
const Server = require("qpi")

const server = new Server({
  body: true,       // enable body parser
  query: true,      // enable query parser
  cors: {
    origins: ["*"]  // allow every origin
  }
})

server.get("/", Q => Q.send("Hello, World!"))
server.get("/hello/:you", Q => Q.send(`Hello, ${Q.param.you}!`))
// GET /hello/bob => Hello, bob!

server.post("/greet", Q => Q.send(`${Q.body.greet}, ${Q.query.me}!`))
// POST /greet?me=Bob -d greet=Hi
// => Hi, Bob!

server.post("/",
  // retrieves the token passed in the authorization header
  async Q => Q.next({token: await Token.find({token: Q.header.Authorization})}),
  // If the token is falsy, send a 401 unauthorized else, call next handler
  Q => Q.$token && Q.next() || Q.unauthorized(),
  // valiates the query and attach what was validated to the context
  Q => Q.next({...(myValidationMiddleware()(Q))}),
  // do stuff
  Q => Q.send({
    say: Q.$say, // populated by the custom validation middleware,
    to: Q.$token.user.name, // fetch by the 1st step
  })
)
// POST / -d "say=   Aloha~   " -H "Authorization: 5up3r5ekr37"
// => {say: "Aloha~", to: "Bob"}
```

One can also inject its own return methods:

```js
const Server = require("qpi")

const server = new Server({
  extend: {
    toInifinity: Q => () => Q.send("And Beyond"),   // add a new response
    internalServerError: Q => e: Error => {         // override an existing response
      if (process.env.NODE_ENV === "development")
        return Q.end(500, {code: "InternalServerError", message: e.message, stack: e.stack})
      return Q.end(500, {code: "InternalServerError", message: "Something went wrong"})
    }
  }
})

server.get("/infinity", Q => Q.toInfinity())
// GET /infinity
// => "And beyond"

server.get("/", () => { throw new Error("foo") })

// GET /
// => { code: "InternalServerError", message: "foo", stack: "..." }
```


# Contributing

## Yarn commands

- **test**: Run tests + coverage
- **lint**: Run linter (`yarn lint --fix` to fix some errors)
- **doc**: Generate JSDoc documentation
