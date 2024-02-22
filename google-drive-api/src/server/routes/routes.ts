import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { logger } from "../../core/utils/logger/logger";
import { UserController } from "../controllers/user.controller";

type Controller = {
  routes: Array<{ method: 'POST', path?: string, handler: Function }>,
  prefix: string
}
export class Routes {
  constructor(private readonly config: { controllers: (new () => any)[] }) { }
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

  private setDefaultHeaders(response: ServerResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-type', 'application/json')
  }

  private getRouteUrl(prefix: string, path?: string): string {
    return path ? `${prefix}/${path}` : prefix;
  }

  private routeNotFoundResponse(request: IncomingMessage, response: ServerResponse) {
    const url = request.url;
    response.writeHead(404)
    response.end(JSON.stringify({
      exception: 'NotFoundException',
      message: `Route with url ${url} not found`
    }));
  }

  async handler(request: IncomingMessage, response: ServerResponse) {
    this.setDefaultHeaders(response)

    for await (const Controller of this.config.controllers) {
      const {
        routes,
        prefix
      } = Object.getOwnPropertyDescriptors(Controller).prototype.value as Controller;

      const route = routes
        .filter(({ method }) => method.toLowerCase() === request.method?.toLowerCase())
        .find((route) => {
          const url = this.getRouteUrl(prefix, route.path);
          const formattedUrl = request.url?.startsWith('/') ? `/${url}` : url;
          return formattedUrl.trim() === request.url?.trim()
        })

      if (route) {
        try {
          const controller = new Controller();
          const result = await route.handler.apply(controller, [request, response, this.io]);
          console.log({ result })
          response.writeHead(200)
          response.end(JSON.stringify(result))
          return;
        } catch (error: any) {
          response.writeHead(404)
          response.end(JSON.stringify({
            exception: 'InternalServerError',
            message: error.message
          }));
          return;
        }
      }

      this.routeNotFoundResponse(request, response)

    }
  }
}