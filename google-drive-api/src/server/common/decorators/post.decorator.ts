import { mapParamDecorators } from "../utils/map-param-decorator.util";

export const Post = (path?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;
    descriptor.value = async (...args: any[]) => {

      const params = await mapParamDecorators({
        args,
        target,
        property: key,
      })

      method.apply(this, [...params])
    };

    if (!target.routes) {
      target.routes = [];
    }
    const prefix = target.constructor.prototype.prefix;

    const full_path = path ? `${prefix}/${path}` : prefix;

    target.routes.push({
      method: 'POST',
      path: full_path,
      handler: descriptor.value
    });

    return descriptor;
  };
}

