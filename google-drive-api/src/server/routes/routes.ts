import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { logger } from "../../core/utils/logger/logger";
import { ParamDecoratorEnum } from "@common/enums";

type RouteController = {
  method: 'POST',
  status?: number,
  path?: string,
  handler: Function
};

type Controller = {
  routes: RouteController[],
  prefix?: string
}
export class Routes {
  constructor(private readonly config: { controllers: (new () => any)[] }) { }
  public io?: Server

  setSocketInstance(io: Server) {
    this.io = io;
  }

  async options(response: ServerResponse) {
    response.writeHead(204)
    response.end()
  }

  private setDefaultResponseHeaders(response: ServerResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-type', 'application/json')
  }

  private getRouteUrl(prefix?: string, path?: string): string {
    if (prefix && path) {
      return `${prefix}/${path}`;
    }

    if (prefix && !path) {
      return prefix;
    }

    if (!prefix && path) {
      return path;
    }

    return ''
  }

  private routeNotFoundResponse(request: IncomingMessage, response: ServerResponse) {
    const url = request.url;
    response.writeHead(404)
    response.end(JSON.stringify({
      exception: 'NotFoundException',
      message: `Route with url ${url} not found`
    }));
  }

  private getControllerRoutes(Controller: new () => any): Controller {
    return Object.getOwnPropertyDescriptors(Controller).prototype.value as Controller;
  }

  private getMatchRoute(routes: RouteController[], request: IncomingMessage, prefix?: string,): RouteController | undefined {
    return routes
      .filter(({ method }) => method.toLowerCase() === request.method?.toLowerCase())
      .find((route) => {
        const url = this.getRouteUrl(prefix, route.path);
        const request_url = request.url?.trim()?.replace(/^\//, '');
        return url.trim() === request_url
      })
  }

  private async executeRouteController({
    Controller,
    request,
    response,
    route
  }: { Controller: new () => any; route: RouteController; request: IncomingMessage; response: ServerResponse }): Promise<void> {
    try {
      const controller = new Controller();
      const output = await route.handler.apply(controller, [
        {
          [ParamDecoratorEnum.BODY]: request,
          [ParamDecoratorEnum.REQ]: request,
          [ParamDecoratorEnum.RES]: response,
          [ParamDecoratorEnum.SOCKET]: this.io
        }
      ]);

      response.writeHead(route.status ?? 200)
      response.end(JSON.stringify(output))
    } catch (error: any) {
      response.writeHead(404)
      response.end(JSON.stringify({
        exception: 'InternalServerError',
        message: error.message
      }));
    }
  }

  async handler(request: IncomingMessage, response: ServerResponse) {
    this.setDefaultResponseHeaders(response)

    if (request.method?.toLowerCase() === 'options') return this.options(response);

    for await (const Controller of this.config.controllers) {
      const { routes, prefix } = this.getControllerRoutes(Controller);

      const route = this.getMatchRoute(routes, request, prefix)

      if (route) {
        return this.executeRouteController({ Controller, route, request, response })
      }

      return this.routeNotFoundResponse(request, response)
    }
  }
}