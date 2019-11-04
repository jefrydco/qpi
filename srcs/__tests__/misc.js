/* eslint-disable max-lines-per-function, max-nested-callbacks */
/* eslint-disable no-magic-numbers */

const client = require("supertest")

const Server = require("..")

describe("Miscelaneous tests", () => {
  it("Should catch uncaught errors", done => {
    const server = new Server()
    server.get("/", () => {
      throw new Error("foo")
    })
    client(server).get("/")
      .expect(500, { code: "InternalServerError", message: "Something went wrong." }, done)
  })

  it("Should override default uncaught errors", done => {
    const server = new Server({
      extend: {
        internalServerError: Q => e => Q.end(500, {
          code:  "ISE",
          msg:   "Something went wrong",
          error: `${e}`,
        }),
      },
    })
    server.get("/", () => {
      throw new Error("foo")
    })
    client(server).get("/")
      .expect(500, { code: "ISE", msg: "Something went wrong", error: "Error: foo" }, done)
  })

  it("Should still return if nothing is sent", done => {
    const server = new Server()
    server.get("/", Q => Q.send({ get: Q.query, param: Q.param, body: Q.body }))
    client(server).get("/")
      .expect(200, { get: {}, body: {}, param: {}}, done)
  })
})
