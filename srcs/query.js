/** Store the context across queries
 *
 *  @access private
 */
const __ctx = {} // eslint-disable-line no-underscore-dangle

/** A query, that is a request and a reponse, and everything in between
 */
class Query {
  /** Construct the query
   *
   *  @package
   *  @param {*} q The request
   *  @param {*} r The response
   *  @param {*} n The next method (which allows chaining)
   *  @param {*} e The error (if an error is passed to .next())
   */
  constructor(q, r, n, e) {
    this._req = q
    this._res = r
    if (typeof n === "object") {
      this._route = n
      this._err = e
    }
    else {
      this._next = n
    }
  }

  //#region getter
  /** Get the ID of the query
   *
   *  @type {String}
   */
  get id() { return this._req.id() }

  /** Get the body that was sent
   *
   *  **NB** Requires having enabled body parsing on Server creation
   *
   *  @type {Object}
   */
  get body() { return this._req.body || {} }

  /** Get the query that was sent
   *
   *  **NB** Requires having enabled query parsing on Server creation
   *
   *  @type {Object}
   */
  get query() { return typeof this._req.query === "object" ? this._req.query : {} }

  /** Gets the full context as an object.
   *
   *  The context is anything that was passed down to the next handler
   *
   *  **NB**:
   *  - Calling `end()`, `send()`, `next(true|false)` clear the context
   *  - calling `$foo` is the same as `$.foo`
   *
   *  @type {Object}
   *
   *  @example
   * Q => Q.next({token}) // attach the token to the context
   * Q.$token == Q.$.token
   */
  get $() { return __ctx[this.id] || {}}

  /** Gets uri parameters (`http://.../:foo/:bar` => `{foo: ..., bar: ...}`)
   *
   *  @type {Object}
   */
  get param() { return this._req.params }

  /** Get http headers
   *
   *  @type {Object}
   */
  get header() { return this._req.headers }
  //#endregion getters

  //#region methods
  /** Writes a response to the client / reset the context / calls next handler
   *
   *  @param {Number} [status=200] The http status to send
   *  @param {any} body The body to send
   *  @param {Object} [headers] Some headers to attach
   */
  send(status, body, headers) {
    this._res.send(status, body, headers)
    this.next(true)
  }

  //#region aliases
  /* eslint-disable no-magic-numbers */
  /** Sends a bad request (400) response
   */
  badRequest() {
    this.end(400, {
      code:    "BadRequest",
      message: "Some fields are missing or invalid.",
    })
  }

  /** Sends a unauthorized (401) response
   */
  unauthorized() {
    this.end(401, {
      code:    "Unauthorized",
      message: "We don't know who you are.",
    })
  }

  /** Sends a forbidden (403) response
   */
  forbidden() {
    this.end(403, {
      code:    "Forbidden",
      message: "You cannot do that.",
    })
  }

  /** Sends a not found (404) response
   */
  notFound() {
    this.end(404, {
      code:    "NotFound",
      message: "This resource cannot be found.",
    })
  }

  /** Sends a conflic (409) response
   */
  conflict() {
    this.end(409, {
      code:    "Conflict",
      message: "This resource already exists.",
    })
  }

  /** Sends a too many request (429) response
   */
  tooManyRequest() {
    this.end(429, {
      code:    "TooManyRequest",
      message: "Try again later.",
    })
  }

  /** Sends a internal server error (500) response
   */
  internalServerError() {
    this.end(500, {
      code:    "InternalServerError",
      message: "Something went wrong.",
    })
  }

  /** Sends a not implemented (501) response
   */
  notImplemented() {
    this.end(501, {
      code:    "NotImplemtented",
      message: "We haven't done that yet.",
    })
  }
  /* eslint-enable no-magic-numbers */
  //#endregion aliases

  /** Writes a response to the client / reset the context / stop handler chain
   *
   *  @param {Number} [status=200] The http status to send
   *  @param {any} body The body to send
   *  @param {Object} [headers] Some headers to attach
   *
   *  One can also use the following alias
   *  - badRequest          => 400, "Some fields are missing or invalid."
   *  - unauthorized        => 401, "We don't know who you are."
   *  - forbidden           => 403, "You cannot do that."
   *  - notFound            => 404, "This resource cannot be found."
   *  - conflict            => 409, "This resource already exists."
   *  - tooManyRequest      => 429, "Try again later."
   *  - internalServerError => 500, "Something went wrong."
   *  - notImplemented      => 501, "We haven't done that yet."
   */
  end(status, body, headers) {
    this._res.send(status, body, headers)
    this.next(false)
  }

  /** Call next handler
   *
   *  @param {Boolean|Object} [ctx] How to handle handlers
   *  @returns {void}
   *
   *  If context is:
   *  - not given: calls next handler
   *  - true: reset context & call next handler
   *  - false: reset context & stop handler chain
   *  - object: attach to the context and call next handler
   */
  next(ctx) {
    if (ctx === true || ctx === false) {
      delete __ctx[this.id]
      if (ctx === true) return this._next()
      return this._next(ctx)
    }
    if (typeof ctx === "object")
      __ctx[this.id] = { ...this.$, ...ctx }
    return this._next()
  }
  //#endregion method
}

module.exports = Query
