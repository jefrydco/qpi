const restify = require("restify")
const Query = require("./query")

/** Wraps and handle most of what a Server does
 */
class Server {
  /** Create the server
   *
   * @param {QpiOptions} opts Options
   */
  constructor(opts = {}) {
    this._server = restify.createServer()

    if (opts.body) this._server.use(restify.plugins.bodyParser())
    if (opts.query) this._server.use(restify.plugins.queryParser())
    // istanbul ignore next
    if (opts.cors) {
      // eslint-disable-next-line global-require
      const cors = require("restify-cors-middleware")(opts.cors)
      this._server.pre(cors.preflight)
      this._server.use(cors.actual)
    }
    this.extended = {
      ...opts.extend || {},
    }
  }

  //#region private
  /** Actually calls the handler and catch unhandled exceptions
   *
   *  @private
   *  @param {Handler} handle The function to decorate
   *  @returns {function} The raw handler for inner server
   */
  _handle(handle) { // eslint-disable-line no-underscore-dangle
    return async (q, r, n, err = null) => {
      const query = new Proxy(new Query(q, r, n, err), { get: (t, e) => {
        if (e === "$") return t.$
        if (e[0] === "$") return t.$[e.slice(1)]
        return this.extended[e] && this.extended[e](t) || t[e]
      } })
      try {
        await handle(query)
      }
      catch (e) {
        query.internalServerError(e)
      }
    }
  }
  //#endregion private

  //#region public methods
  /** Call this before anything else
   *
   *  @param {...Handler} handlers What to do before the route is resolved
   */
  beforeAll(...handlers) {
    this._server.pre(...handlers.map(h => this._handle(h)))
  }

  /** Call this before routes handlers
   *
   *  @param {...Handler} handlers What to do after the route is resolved
   */
  before(...handlers) {
    this._server.use(...handlers.map(h => this._handle(h)))
  }

  /** Call this after routes handlers
   *
   *  @param {...Handler} handlers What to do after the route is ran
   */
  after(...handlers) {
    handlers.map(h => this._server.on("after", this._handle(h)))
  }

  //#region HTTP Verbs
  /** Handle GET routes
   *
   * @param {String} route The route to listen to
   * @param  {...Handler} handlers Handlers to chain
   */
  get(route, ...handlers) {
    this._server.get(route, ...handlers.map(h => this._handle(h)))
  }

  /** Handle POST routes
   *
   * @param {String} route The route to listen to
   * @param  {...Handler} handlers Handlers to chain
   */
  post(route, ...handlers) {
    this._server.post(route, ...handlers.map(h => this._handle(h)))
  }

  /** Handle PUT routes
   *
   * @param {String} route The route to listen to
   * @param  {...Handler} handlers Handlers to chain
   */
  put(route, ...handlers) {
    this._server.put(route, ...handlers.map(h => this._handle(h)))
  }

  /** Handle DELETE routes
   *
   * @param {String} route The route to listen to
   * @param  {...Handler} handlers Handlers to chain
   */
  del(route, ...handlers) {
    this._server.del(route, ...handlers.map(h => this._handle(h)))
  }

  /** Handle PATCH routes
   *
   * @param {String} route The route to listen to
   * @param  {...Handler} handlers Handlers to chain
   */
  patch(route, ...handlers) {
    this._server.patch(route, ...handlers.map(h => this._handle(h)))
  }
  //#endregion HTTP Verbs

  /** Start the server
   *
   *  @param {Number} port The port to listen to
   *  @param {String} [ip] The ip to listen to
   *  @param {function} [cb] The method to call once the server is started
   */
  listen(port, ip, cb) { this._server.listen(port, ip, cb) }

  /** Get the address of the server
   *
   *  @returns {AddressInterface} The address
   */
  address() { return this._server.address() }
  //#region public methods
}

module.exports = Server
