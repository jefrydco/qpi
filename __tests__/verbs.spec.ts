import client from "supertest";
import Server, { instanceQuery } from "../lib/index";

const server = new Server();

server.get("/", (Q: instanceQuery): any => Q.send({ msg: "ok" }));
server.put("/", (Q: instanceQuery): any => Q.send({ msg: "ok" }));
server.del("/", (Q: instanceQuery): any => Q.send({ msg: "ok" }));
server.post("/", (Q: instanceQuery): any => Q.send({ msg: "ok" }));
server.patch("/", (Q: instanceQuery): any => Q.send({ msg: "ok" }));

server.get("/parameters/:plop", (Q: instanceQuery): any => {
  return Q.send({
    headers: (() => {
      const { header, kikoo } = Q.headers;
      return { header, kikoo };
    })(),
    params: Q.params,
    query: Q.query
  });
});
server.put("/parameters/:plop", (Q: instanceQuery): any => {
  return Q.send({
    headers: (() => {
      const { header, kikoo } = Q.headers;
      return { header, kikoo };
    })(),
    params: Q.params,
    query: Q.query,
    body: Q.body
  });
});
server.del("/parameters/:plop", (Q: instanceQuery): any => {
  return Q.send({
    headers: (() => {
      const { header, kikoo } = Q.headers;
      return { header, kikoo };
    })(),
    params: Q.params,
    query: Q.query,
    body: Q.body
  });
});
server.post("/parameters/:plop", (Q: instanceQuery): any => {
  return Q.send({
    headers: (() => {
      const { header, kikoo } = Q.headers;
      return { header, kikoo };
    })(),
    params: Q.params,
    query: Q.query,
    body: Q.body
  });
});
server.patch("/parameters/:plop", (Q: instanceQuery): any => {
  return Q.send({
    headers: (() => {
      const { header, kikoo } = Q.headers;
      return { header, kikoo };
    })(),
    params: Q.params,
    query: Q.query,
    body: Q.body
  });
});

describe("handle basic verbs", () => {
  describe("no queries", () => {
    it("should handle get", done => {
      client(server)
        .get("/")
        .expect(200, { msg: "ok" }, done);
    });

    it("should handle post", done => {
      client(server)
        .post("/")
        .expect(200, { msg: "ok" }, done);
    });

    it("should handle put", done => {
      client(server)
        .put("/")
        .expect(200, { msg: "ok" }, done);
    });

    it("should handle del", done => {
      client(server)
        .del("/")
        .expect(200, { msg: "ok" }, done);
    });

    it("should handle patch", done => {
      client(server)
        .patch("/")
        .expect(200, { msg: "ok" }, done);
    });
  });

  describe("with parameters", () => {
    it("should handle empty parameters in get", done => {
      client(server)
        .get("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" }
          },
          done
        );
    });

    it("should handle empty parameters in put", done => {
      client(server)
        .put("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle empty parameters in del", done => {
      client(server)
        .del("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle empty parameters in post", done => {
      client(server)
        .post("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle empty parameters in patch", done => {
      client(server)
        .patch("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle any parameters in get", done => {
      client(server)
        .get("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" }
          },
          done
        );
    });

    it("should handle any parameters in put", done => {
      client(server)
        .put("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle any parameters in del", done => {
      client(server)
        .del("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle any parameters in post", done => {
      client(server)
        .post("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });

    it("should handle any parameters in patch", done => {
      client(server)
        .patch("/parameters/test?hello=world&foo=bar")
        .set("header", "somethibg")
        .set("kikoo", "hi")
        .send({ plop: 42, foo: "hkjh" })
        .expect(
          200,
          {
            headers: { header: "somethibg", kikoo: "hi" },
            params: { plop: "test" },
            query: { hello: "world", foo: "bar" },
            body: { plop: 42, foo: "hkjh" }
          },
          done
        );
    });
  });
});
