import client from "supertest";
import Server, { instanceQuery } from "../lib/index";

describe("chaining & context", () => {
  it("Should be able to chain calls", async done => {
    const server = new Server();
    let a = 0;
    server.get(
      "/",
      (Q: instanceQuery): void => {
        a += 42;
        Q.next();
      },
      (Q: any): any => Q.send({ a })
    );
    await client(server)
      .get("/")
      .expect(200, { a: 42 });
    expect(a).toBe(42);
    done();
  });

  it("Should be able to interupt the chain", async done => {
    const server = new Server();
    let a = 0;
    server.get(
      "/",
      (Q: instanceQuery): void => {
        a += 42;
        Q.next();
      },
      (Q: instanceQuery): any => Q.end({ a }),
      (Q: instanceQuery): any => Q.send({ a: a += 42 })
    );
    await client(server)
      .get("/")
      .expect(200, { a: 42 });
    expect(a).toBe(42);
    done();
  });

  it("Should be able to pass down context to the next handler", done => {
    const server = new Server();
    server.get(
      "/",
      (Q: instanceQuery): any => Q.next({ a: 42 }),
      (Q: instanceQuery): any => Q.next({ a: Q.$.a * 2 }),
      (Q: instanceQuery): any => Q.next({ a: Q.$.a + 2 }),
      (Q: instanceQuery): any => Q.send({ ...Q.$ })
    );
    client(server)
      .get("/")
      .expect(200, { a: 86 }, done);
  });

  it("Should be able to clear the context", async done => {
    const server = new Server();
    server.get(
      "/",
      (Q: instanceQuery): any => Q.next({ a: 42 }),
      (Q: instanceQuery): any => Q.next(true),
      (Q: instanceQuery): any => Q.next({ a: ((Q.$ && Q.$.a) || 0) + 2 }),
      (Q: instanceQuery): any => Q.send({ ...Q.$ })
    );
    client(server)
      .get("/")
      .expect(200, { a: 2 }, done);
  });
});
