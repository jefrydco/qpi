import { Request, Response, Next } from "restify";

export type Context = Record<string, any>;

export enum ResponseCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  TooManyRequest = 429,
  InternalServerError = 500,
  NotImplemented = 501
}

export enum ResponseCodeString {
  BadRequest = "BadRequest",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  NotFound = "NotFound",
  Conflict = "Conflict",
  TooManyRequest = "TooManyRequest",
  InternalServerError = "InternalServerError",
  NotImplemented = "NotImplemented"
}

export interface QueryImpl {
  id: string;
  body: any;
  query: any;
  $: any;
  params: any;
  headers: any;

  send(body?: any, headers?: { [header: string]: string }): void;
  send(
    status?: number,
    body?: any,
    headers?: { [header: string]: string }
  ): void;
  end(body?: any, headers?: { [header: string]: string }): void;
  end(status: number, body: any, headers?: { [header: string]: string }): void;
  next(ctx: boolean | any): void;

  badRequest(): void;
  unauthorized(): void;
  forbidden(): void;
  notFound(): void;
  conflict(): void;
  tooManyRequest(): void;
  internalServerError(): void;
  notImplemented(): void;
}

/**
 * Store the context across queries
 *
 * @access private
 */
const __ctx: Context = {};

/**
 * A query, that is a request and a response, and everything in between
 */
class Query implements QueryImpl {
  private _req: Request;
  private _res: Response;
  private _next: Next;

  /**
   * Construct the query
   * @param q The request
   * @param r The response
   * @param n The next method (which allows chaining)
   */
  constructor(q?: Request, r?: Response, n?: Next) {
    this._req = q as Request;
    this._res = r as Response;
    this._next = n as Next;
  }

  /**
   * Get the ID of the query
   */
  get id(): string {
    return this._req.id();
  }

  /**
   * Get the body that was sent
   *
   * **NB** Requires having enabled body parsing on Server creation
   */
  get body() {
    return this._req.body || {};
  }

  /**
   * Get the query that was sent
   *
   * **NB** Requires having enabled query parsing on Server creation
   */
  get query() {
    if (typeof this._req.query === "object") {
      return this._req.query;
    }
    return {};
  }

  /**
   * Gets the full context as an object
   *
   * The context is anything that was passed down to the next handler
   *
   * **NB**:
   * - Calling `end()`, `send()`, `next(true|false)` clear the context
   * - Calling `$foo` is the same as `$.foo`
   *
   * @example
   * Q => Q.next({ token }) // attach the token to the context
   * Q.$token === Q.$.token
   */
  get $() {
    return __ctx[this.id];
  }

  /**
   * Gets uri parameters (`http://.../:foo/:bar` => `{foo: ..., bar: ...}`)
   */
  get params() {
    return this._req.params;
  }

  /**
   * Get http headers
   */
  get headers() {
    return this._req.headers;
  }

  /**
   * Writes a response to the client/reset the context/call next handler
   * @param body The body to send
   * @param headers Some headers to attach
   */
  send(body?: any, headers?: { [header: string]: string }): void;

  /**
   * Writes a response to the client/reset the context/call next handler
   * @param status The http status to send
   * @param body The body to send
   * @param headers Some headers to attach
   */
  send(
    status?: number,
    body?: any,
    headers?: { [header: string]: string }
  ): void {
    this._res.send(status, body, headers);
    this.next(true);
  }

  /**
   * Write  a response to the client / reset the context / stop handler chain
   *
   * One can also use the following alias
   * - badRequest           => 400, "Some fields are missing or invalid."
   * - unauthorized         => 401, "We don't know who you are."
   * - forbidden            => 403, "You can't do that."
   * - notFound             => 404, "This resource can't be found."
   * - conflict             => 409, "This resource already exists."
   * - tooManyRequest       => 429, "Try again later."
   * - internalServerError  => 500, "Something went wrong."
   * - notImplemented       => 501, "We haven't done that yet."
   *
   * @param body The body to send
   * @param headers Some headers to attach
   */
  end(body?: any, headers?: { [header: string]: string }): void;

  /**
   * Write  a response to the client / reset the context / stop handler chain
   *
   * One can also use the following alias
   * - badRequest           => 400, "Some fields are missing or invalid."
   * - unauthorized         => 401, "We don't know who you are."
   * - forbidden            => 403, "You can't do that."
   * - notFound             => 404, "This resource can't be found."
   * - conflict             => 409, "This resource already exists."
   * - tooManyRequest       => 429, "Try again later."
   * - internalServerError  => 500, "Something went wrong."
   * - notImplemented       => 501, "We haven't done that yet."
   *
   * @param status The http status to send
   * @param body The body to send
   * @param headers Some headers to attach
   */
  end(
    status?: number,
    body?: any,
    headers?: { [header: string]: string }
  ): void {
    this._res.send(status, body, headers);
    this.next(false);
  }

  /**
   * Call next handler
   *
   * If the context is:
   * - not given: calls next handler
   * - true: reset context and call next handler
   * - false: reset context and stop handler chain
   * - object: attach to the context and call next handler
   *
   * @param ctx How to handle handlers
   */
  next(ctx?: any): void {
    if (ctx === true || ctx === false) {
      delete __ctx[this.id];
      if (ctx === true) {
        return this._next();
      }
      return this._next(ctx);
    }
    if (typeof ctx === "object") {
      __ctx[this.id] = { ...this.$, ...ctx };
    }
    return this._next();
  }

  /**
   * Send a bad request (400) response
   */
  badRequest(): void {
    this.end(ResponseCode.BadRequest, {
      code: ResponseCodeString.BadRequest,
      message: "Some fields are missing or invalid."
    });
  }

  /**
   * Send a unauthorized (401) response
   */
  unauthorized(): void {
    this.end(ResponseCode.Unauthorized, {
      code: ResponseCodeString.Unauthorized,
      message: `We don't know who you are.`
    });
  }

  /**
   * Send a forbidden (403) response
   */
  forbidden(): void {
    this.end(ResponseCode.Forbidden, {
      code: ResponseCodeString.Forbidden,
      message: `You can't do that.`
    });
  }

  /**
   * Send a not found (404) response
   */
  notFound(): void {
    this.end(ResponseCode.NotFound, {
      code: ResponseCodeString.NotFound,
      message: `This resource can't be found.`
    });
  }

  /**
   * Send a conflict (409) response
   */
  conflict(): void {
    this.end(ResponseCode.Conflict, {
      code: ResponseCodeString.Conflict,
      message: `This resource already exists.`
    });
  }

  /**
   * Send a too many request (429) response
   */
  tooManyRequest(): void {
    this.end(ResponseCode.TooManyRequest, {
      code: ResponseCodeString.TooManyRequest,
      message: "Try again later."
    });
  }

  /**
   * Send an internal server error (500) response
   */
  internalServerError(): void {
    this.end(ResponseCode.InternalServerError, {
      code: ResponseCodeString.InternalServerError,
      message: "Something went wrong."
    });
  }

  /**
   * Send a not implemented (501) response
   */
  notImplemented(): void {
    this.end(ResponseCode.NotImplemented, {
      code: ResponseCodeString.NotImplemented,
      message: `We haven't done that yet.`
    });
  }
}

export default Query;
