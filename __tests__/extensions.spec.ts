import client from "supertest";
import Server, { instanceQuery } from "../lib/index";
import { ResponseCode, ResponseCodeString } from "../lib/query";

describe("handle basic verbs", () => {
  describe("Should have default error messages", () => {
    it("400 Bad Request", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.badRequest());
      client(server)
        .get("/")
        .expect(
          ResponseCode.BadRequest,
          {
            code: ResponseCodeString.BadRequest,
            message: "Some fields are missing or invalid."
          },
          done
        );
    });

    it("401 Unauthorized", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.unauthorized());
      client(server)
        .get("/")
        .expect(
          ResponseCode.Unauthorized,
          {
            code: ResponseCodeString.Unauthorized,
            message: `We don't know who you are.`
          },
          done
        );
    });

    it("403 Forbidden", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.forbidden());
      client(server)
        .get("/")
        .expect(
          ResponseCode.Forbidden,
          {
            code: ResponseCodeString.Forbidden,
            message: `You can't do that.`
          },
          done
        );
    });

    it("404 Not Found", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.notFound());
      client(server)
        .get("/")
        .expect(
          ResponseCode.NotFound,
          {
            code: ResponseCodeString.NotFound,
            message: `This resource can't be found.`
          },
          done
        );
    });

    it("409 Conflict", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.conflict());
      client(server)
        .get("/")
        .expect(
          ResponseCode.Conflict,
          {
            code: ResponseCodeString.Conflict,
            message: `This resource already exists.`
          },
          done
        );
    });

    it("429 Too Many Request", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.tooManyRequest());
      client(server)
        .get("/")
        .expect(
          ResponseCode.TooManyRequest,
          {
            code: ResponseCodeString.TooManyRequest,
            message: `Try again later.`
          },
          done
        );
    });

    it("500 Internal Server Error", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.internalServerError());
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

    it("501 Not Implemented", done => {
      const server = new Server();
      server.get("/", (Q: instanceQuery): any => Q.notImplemented());
      client(server)
        .get("/")
        .expect(
          ResponseCode.NotImplemented,
          {
            code: ResponseCodeString.NotImplemented,
            message: `We haven't done that yet.`
          },
          done
        );
    });
  });

  // describe("Should override default messages", () => {

  //   it("Should override 404 message", done => {
  //     const server = new Server({
  //       extend: {
  //         notFound: (Q: instanceQuery): any => (p: string): any => Q.end(400, { msg: `not found ${p}` })
  //       }
  //     })
  //     // @ts-ignore
  //     server.get('/', (Q: instanceQuery): any => Q.notFound('Hello'))
  //     client(server).get('/')
  //       .expect(404, { msg: "not found Hello" }, done)
  //   })

  // })
});
