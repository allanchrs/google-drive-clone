// import { IncomingMessage, ServerResponse } from "http";
// import 'reflect-metadata'

// export const Body = () => {
//   console.log('aqqqqqqq')

//   return (target, key, index) => {
//     const args = Reflect.getMetadata('aaaa', target.constructor, key) || {};
//     console.log({ args })
//     // const hasParamData = (0, shared_utils_1.isNil)(data) || (0, shared_utils_1.isString)(data);
//     // const paramData = hasParamData ? data : undefined;
//     // const paramPipes = hasParamData ? pipes : [data, ...pipes];
//     // Reflect.defineMetadata(constants_1.ROUTE_ARGS_METADATA, assignMetadata(args, paramtype, index, paramData, ...paramPipes), target.constructor, key);
//     // return (target: any, propertyKey: string, parameterIndex: number) => {
//     //   const method = target[propertyKey];
//     //   console.log({ target, propertyKey, parameterIndex })
//     //   target[propertyKey] = async (...args: any[]) => {
//     //     const [request, response] = args as [IncomingMessage, ServerResponse];

//     //     return new Promise((resolve, reject) => {
//     //       let body = '';

//     //       request.on('data', (chunk) => body += chunk);
//     //       console.log({ body })
//     //       request.on('end', () => {
//     //         try {
//     //           const parse = JSON.parse(body);
//     //           args[parameterIndex] = parse;
//     //           resolve(method.apply(this, args))
//     //         } catch (error) {
//     //           reject(error)
//     //         }
//     //       })

//     //       request.on('error', (error) => reject(error))
//     //     })
//     //   }
//     // }
//   }
// }


export const Body = () => {
  return (target: any, key: any, index: any) => {

    console.log({ target, key, index })
  };
}