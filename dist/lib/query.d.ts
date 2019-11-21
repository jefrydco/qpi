/// <reference types="node" />
import { Request, Response, Next } from "restify";
export declare type Context = Record<string, any>;
export declare enum ResponseCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  TooManyRequest = 429,
  InternalServerError = 500,
  NotImplemented = 501
}
export declare enum ResponseCodeString {
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
  send(
    body?: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
  send(
    status?: number,
    body?: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
  end(
    body?: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
  end(
    status: number,
    body: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
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
 * A query, that is a request and a response, and everything in between
 */
declare class Query implements QueryImpl {
  private _req;
  private _res;
  private _next;
  /**
   * Construct the query
   * @param q The request
   * @param r The response
   * @param n The next method (which allows chaining)
   */
  constructor(q?: Request, r?: Response, n?: Next);
  /**
   * Get the ID of the query
   */
  get id(): string;
  /**
   * Get the body that was sent
   *
   * **NB** Requires having enabled body parsing on Server creation
   */
  get body(): any;
  /**
   * Get the query that was sent
   *
   * **NB** Requires having enabled query parsing on Server creation
   */
  get query(): any;
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
  get $(): any;
  /**
   * Gets uri parameters (`http://.../:foo/:bar` => `{foo: ..., bar: ...}`)
   */
  get params(): any;
  /**
   * Get http headers
   */
  get headers(): import("http").IncomingHttpHeaders;
  /**
   * Writes a response to the client/reset the context/call next handler
   * @param body The body to send
   * @param headers Some headers to attach
   */
  send(
    body?: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
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
  end(
    body?: any,
    headers?: {
      [header: string]: string;
    }
  ): void;
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
  next(ctx?: any): void;
  /**
   * Send a bad request (400) response
   */
  badRequest(): void;
  /**
   * Send a unauthorized (401) response
   */
  unauthorized(): void;
  /**
   * Send a forbidden (403) response
   */
  forbidden(): void;
  /**
   * Send a not found (404) response
   */
  notFound(): void;
  /**
   * Send a conflict (409) response
   */
  conflict(): void;
  /**
   * Send a too many request (429) response
   */
  tooManyRequest(): void;
  /**
   * Send an internal server error (500) response
   */
  internalServerError(): void;
  /**
   * Send a not implemented (501) response
   */
  notImplemented(): void;
}
export default Query;
