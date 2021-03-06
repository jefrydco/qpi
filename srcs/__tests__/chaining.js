/* eslint-disable max-lines-per-function, max-nested-callbacks */
/* eslint-disable no-magic-numbers */

const client = require("supertest")

const Server = require("..")

describe("chaining & context", () => {
  it("Should be able to chain calls", async done => {
    const server = new Server()
    let a = 0
    server.get("/",
      Q => {
        a += 42
        Q.next()
      },
      Q => Q.send({ a }))
    await client(server).get("/").expect(200, { a: 42 })
    expect(a).toBe(42)
    done()
  })
  it("Should be able to interupt the chain", async done => {
    const server = new Server()
    let a = 0
    server.get("/",
      Q => {
        a += 42
        Q.next()
      },
      Q => Q.end({ a }),
      // eslint-disable-next-line no-return-assign
      Q => Q.send({ a: a += 42 }))
    await client(server).get("/").expect(200, { a: 42 })
    expect(a).toBe(42)
    done()
  })
  it("Should be able to pass down context to the next handler", done => {
    const server = new Server()
    server.get("/",
      Q => Q.next({ a: 42 }),
      Q => Q.next({ a: Q.$a * 2 }),
      Q => Q.next({ a: Q.$.a + 2 }),
      Q => Q.send({ ...Q.$ }))
    client(server).get("/").expect(200, { a: 86 }, done)
  })
  it("Should be able to clear the context", done => {
    const server = new Server()
    server.get("/",
      Q => Q.next({ a: 42 }),
      Q => Q.next(true),
      Q => Q.next({ a: (Q.$.a || 0) + 2 }),
      Q => Q.send({ ...Q.$ }))
    client(server).get("/").expect(200, { a: 2 }, done)
  })
})
