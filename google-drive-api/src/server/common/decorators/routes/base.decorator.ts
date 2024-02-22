import { HttpMethodEnum } from "../../enums"

type DefineOutput = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any

type Input = {
  method: HttpMethodEnum,
  path?: string,
  interceptor?: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor
}

const registerRoute = ({ method, path, target, descriptor }: Input & { target: any, descriptor: PropertyDescriptor }) => {
  if (!target.routes) {
    target.routes = [];
  }
  const prefix = target.constructor.prototype.prefix;

  const full_path = path ? `${prefix}/${path}` : prefix;

  target.routes.push({
    method,
    path: full_path,
    handler: descriptor.value
  });

  return descriptor;
}

export const baseHttpDecorator = ({ method, path, interceptor }: Input): DefineOutput => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (interceptor) {
      interceptor(target, propertyKey, descriptor);
    };

    return registerRoute({ target, descriptor, method, path })
  }
}