import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { logger } from "../../core/utils/logger/logger";

export class Routes {
  constructor() { }
  public io?: Server

  setSocketInstance(io: Server) {
    this.io = io;
  }

  async defaultRoute(request: IncomingMessage, response: ServerResponse) {
    response.end('hello world')
  }

  async options(request: IncomingMessage, response: ServerResponse) {
    response.writeHead(204)
    response.end()
  }

  async post(request: IncomingMessage, response: ServerResponse) {
    logger.info('[POST]')
    response.end()
  }

  async get(request: IncomingMessage, response: ServerResponse) {
    logger.info('[GET]')
    response.end()
  }

  async handler(request: IncomingMessage, response: ServerResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    const chosen = (
      this[request.method?.toLowerCase() as string] ?? this.defaultRoute
    ) as (request: IncomingMessage, response: ServerResponse) => any;
    return chosen.apply(this, [request, response]);
  }
}