import restify, { AddressInterface } from "restify";
import Query from "./query";
export declare type instanceQuery = InstanceType<typeof Query>;
export declare type handler = (Q: instanceQuery) => any;
export interface ServerImpl {
  get(route: string, ...handlers: Array<handler>): void;
  post(route: string, ...handlers: Array<handler>): void;
  put(route: string, ...handlers: Array<handler>): void;
  del(route: string, ...handlers: Array<handler>): void;
  patch(route: string, ...handlers: Array<handler>): void;
  listen(port: number, ip: string, cb: Function): void;
  address(): AddressInterface;
}
export interface Options {
  query?: boolean;
  body?: boolean;
  extend?: extend;
  cors?: Cors;
}
export declare type extend = {
  [key: string]: (Q: instanceQuery) => any;
};
export interface Cors {
  origins: string[] | RegExp | "*";
  allowHeaders: string[];
  exposeHeaders: string[];
}
/**
 * Wraps and handle the most of what a Server does
 */
declare class Server implements ServerImpl {
  private _server;
  private extended;
  /**
   * Create the server
   *
   * @param opts Server opts
   */
  constructor(opts?: Options);
  /**
   * Actually calls the handler and catch unhandled exceptions
   *
   * @private
   * @param handle The function to decorate
   * @returns The raw handler for inner server
   */
  private _handle;
  /**
   * Handle GET routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  get(route: string, ...handlers: Array<handler>): void;
  /**
   * Handle POST routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  post(route: string, ...handlers: Array<handler>): void;
  /**
   * Handle PUT routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  put(route: string, ...handlers: Array<handler>): void;
  /**
   * Handle DELETE routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  del(route: string, ...handlers: Array<handler>): void;
  /**
   * Handle PATCH routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  patch(route: string, ...handlers: Array<handler>): void;
  /**
   * Start the server
   *
   * @param port The port to listen to
   * @param ip The IP to listen to
   * @param cb The method to call once the server is started
   */
  listen(port: number, ip: string, cb: Function): void;
  /**
   * Get the address of the server
   *
   * @returns Returns the server address. Wraps node's address().
   */
  address(): restify.AddressInterface;
}
export default Server;
