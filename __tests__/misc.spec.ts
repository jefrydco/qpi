import client from "supertest";
import Server, { instanceQuery } from "../lib/index";
import { ResponseCode, ResponseCodeString } from "../lib/query";

describe("Miscelaneous tests", () => {
  it("Should catch uncaught errors", done => {
    const server = new Server();
    server.get("/", () => {
      throw new Error("foo");
    });
    client(server)
      .get("/")
      .expect(
        ResponseCode.InternalServerError,
        {
          code: ResponseCodeString.InternalServerError,
          message: "Something went wrong."
        },
        done
      );
  });

  // it("Should override default uncaught errors", done => {
  //   const server = new Server({
  //     extend: {
  //       internalServerError: (Q: instanceQuery): any => (e: string) => Q.end(500, {
  //         code:  "ISE",
  //         msg:   "Something went wrong",
  //         error: `${e}`,
  //       }),
  //     },
  //   })
  //   server.get("/", () => {
  //     throw new Error("foo")
  //   })
  //   client(server).get("/")
  //     .expect(500, { code: "ISE", msg: "Something went wrong", error: "Error: foo" }, done)
  // })

  it("Should still return if nothing is sent", done => {
    const server = new Server();
    server.get("/", (Q: instanceQuery): any =>
      Q.send({ get: Q.query, params: Q.params, body: Q.body })
    );
    client(server)
      .get("/")
      .expect(200, { get: {}, body: {}, params: {} }, done);
  });
});
