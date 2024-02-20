import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { logger } from "../../core/utils/logger/logger";
import { UserController } from "../controllers/user.controller";

type Controller = {
  routes: Array<{ method: 'POST', path?: string, handler: Function }>,
  prefix: string
}
export class Routes {
  constructor() { }
  public io?: Server

  private controllers: (new () => any)[] = [UserController];

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
    response.setHeader('Content-type', 'application/json')
    for await (const Controller of this.controllers) {
      const {
        routes,
        prefix
      } = Object.getOwnPropertyDescriptors(Controller).prototype.value as Controller;

      const route = routes
        .filter(({ method }) => method.toLowerCase() === request.method?.toLowerCase())
        .find((route) => {
          const url = route.path ? `${prefix}/${route.path}` : prefix;
          const formattedUrl = request.url?.startsWith('/') ? `/${url}` : url;
          return formattedUrl.trim() === request.url?.trim()
        })

      if (route) {
        const controllerInstance = new Controller();
        const result = await route.handler.apply(controllerInstance[route.handler.name], [request, response]);
        response.writeHead(200)
        response.end(JSON.stringify(result))
      } else {
        response.writeHead(404)
        response.end();
      }
    }



    // console.log('userC', this.userController.routes);
    // const routes = [this.userController.routes]

    // const chosen = (
    //   this[request.method?.toLowerCase() as string] ?? this.defaultRoute
    // ) as (request: IncomingMessage, response: ServerResponse) => any;
    // return chosen.apply(this, [request, response]);
  }


}