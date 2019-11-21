import restify, { Request, Response, Next, AddressInterface } from "restify";
import Query from "./query";

export type instanceQuery = InstanceType<typeof Query>;
export type handler = (Q: instanceQuery) => any;

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

export type extend = {
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
class Server implements ServerImpl {
  private _server: restify.Server;
  private extended: Record<string, any>;

  /**
   * Create the server
   *
   * @param opts Server opts
   */
  constructor(opts: Options = { query: true, body: true }) {
    this._server = restify.createServer();

    if (opts.body) {
      this._server.use(restify.plugins.bodyParser());
    }
    if (opts.query) {
      this._server.use(restify.plugins.queryParser());
    }
    if (opts.cors) {
      const cors = require("restify-cors-middleware")(opts.cors);
      this._server.pre(cors.preflight);
      this._server.use(cors.actual);
    }
    this.extended = {
      ...(opts.extend || {})
    };
  }

  /**
   * Actually calls the handler and catch unhandled exceptions
   *
   * @private
   * @param handle The function to decorate
   * @returns The raw handler for inner server
   */
  private _handle(handle: handler) {
    return async (q: Request, r: Response, n: Next) => {
      const query = new Proxy(new Query(q, r, n), {
        get: (t, e) => {
          if (e === "$") {
            return t.$;
          }
          // @ts-ignore
          if (e[0] === "$") {
            // @ts-ignore
            return t.$[e.slice(1)];
          }
          // @ts-ignore
          return (this.extended[e] && this.extended[e](t)) || t[e];
        }
      });
      try {
        await handle(query);
      } catch (error) {
        console.log(error);
        query.internalServerError();
      }
    };
  }

  /**
   * Handle GET routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  get(route: string, ...handlers: Array<handler>): void {
    this._server.get(route, ...handlers.map(h => this._handle(h)));
  }

  /**
   * Handle POST routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  post(route: string, ...handlers: Array<handler>): void {
    this._server.post(route, ...handlers.map(h => this._handle(h)));
  }

  /**
   * Handle PUT routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  put(route: string, ...handlers: Array<handler>): void {
    this._server.put(route, ...handlers.map(h => this._handle(h)));
  }

  /**
   * Handle DELETE routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  del(route: string, ...handlers: Array<handler>): void {
    this._server.del(route, ...handlers.map(h => this._handle(h)));
  }

  /**
   * Handle PATCH routes
   *
   * @param route The route to listen to
   * @param handlers Handlers to chain
   */
  patch(route: string, ...handlers: Array<handler>): void {
    this._server.patch(route, ...handlers.map(h => this._handle(h)));
  }

  /**
   * Start the server
   *
   * @param port The port to listen to
   * @param ip The IP to listen to
   * @param cb The method to call once the server is started
   */
  listen(port: number, ip: string, cb: Function): void {
    this._server.listen(port, ip, cb);
  }

  /**
   * Get the address of the server
   *
   * @returns Returns the server address. Wraps node's address().
   */
  address(): restify.AddressInterface {
    return this._server.address();
  }
}

export default Server;
