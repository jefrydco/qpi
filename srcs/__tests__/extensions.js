/* eslint-disable max-lines-per-function, max-nested-callbacks */
/* eslint-disable no-magic-numbers */

const client = require("supertest")

const Server = require("..")

describe("handle basic verbs", () => {
  describe("Should have default error messages", () => {
    it("400 Bad Request", done => {
      const server = new Server()
      server.get("/", Q => Q.badRequest())
      client(server).get("/")
        .expect(400, { code: "BadRequest", message: "Some fields are missing or invalid." }, done)
    })
    it("401 Unauthorized", done => {
      const server = new Server()
      server.get("/", Q => Q.unauthorized())
      client(server).get("/")
        .expect(401, { code: "Unauthorized", message: "We don't know who you are." }, done)
    })
    it("403 Forbidden", done => {
      const server = new Server()
      server.get("/", Q => Q.forbidden())
      client(server).get("/")
        .expect(403, { code: "Forbidden", message: "You cannot do that." }, done)
    })
    it("404 Not Found", done => {
      const server = new Server()
      server.get("/", Q => Q.notFound())
      client(server).get("/")
        .expect(404, { code: "NotFound", message: "This resource cannot be found." }, done)
    })
    it("409 Conflict", done => {
      const server = new Server()
      server.get("/", Q => Q.conflict())
      client(server).get("/")
        .expect(409, { code: "Conflict", message: "This resource already exists." }, done)
    })
    it("429 Too Many Request", done => {
      const server = new Server()
      server.get("/", Q => Q.tooManyRequest())
      client(server).get("/")
        .expect(429, { code: "TooManyRequest", message: "Try again later." }, done)
    })
    it("500 Internal Server Error", done => {
      const server = new Server()
      server.get("/", Q => Q.internalServerError())
      client(server).get("/")
        .expect(500, { code: "InternalServerError", message: "Something went wrong." }, done)
    })
    it("501 Not Implemtented", done => {
      const server = new Server()
      server.get("/", Q => Q.notImplemented())
      client(server).get("/")
        .expect(501, { code: "NotImplemtented", message: "We haven't done that yet." }, done)
    })
  })
  describe("Should override default messages", () => {
    it("Should override 404 message", done => {
      const server = new Server({
        extend: {
          notFound: Q => p => Q.end(404, { msg: `not found${p}` }),
        },
      })
      server.get("/", Q => Q.notFound("blah"))
      client(server).get("/")
        .expect(404, { msg: "not foundblah" }, done)
    })
  })
})
