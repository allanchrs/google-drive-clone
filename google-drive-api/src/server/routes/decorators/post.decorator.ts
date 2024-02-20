export const Post = (path?: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
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
  };
}