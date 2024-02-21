import { HttpMethodEnum } from "../enums/http-method.enum";

type DefineOutput = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor

type Input = {
  method: HttpMethodEnum,
  path?: string,
  interceptor?: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
}

export const httpBaseDecorator = ({ method, path, interceptor }: Input): DefineOutput => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (interceptor) interceptor(target, propertyKey, descriptor);

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
}