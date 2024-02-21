import { IncomingMessage, ServerResponse } from "http";
import { ParamDecoratorEnum } from "../enums/param-decorator.enum";
import { getBodyAsJson } from "./body-as-json.util";
import { Server } from "socket.io";

type MapParamDecorators = {
  target: any,
  property: string,
  args: any[]
}

const tranformer = {
  [ParamDecoratorEnum.BODY]: getBodyAsJson,
  [ParamDecoratorEnum.REQ]: (request?: IncomingMessage) => request,
  [ParamDecoratorEnum.RES]: (response?: ServerResponse) => response,
  [ParamDecoratorEnum.SOCKET]: (socket?: Server) => socket,
}

const getParamByParamDecorator = {
  [ParamDecoratorEnum.BODY]: (args: any[]) => args.find((arg) => arg instanceof IncomingMessage),
  [ParamDecoratorEnum.REQ]: (args: any[]) => args.find((arg) => arg instanceof IncomingMessage),
  [ParamDecoratorEnum.RES]: (args: any[]) => args.find((arg) => arg instanceof ServerResponse),
  [ParamDecoratorEnum.SOCKET]: (args: any[]) => args.find((arg) => arg instanceof Server),
}

export const mapParamDecorators = async ({ target, property, args }: MapParamDecorators): Promise<any[]> => {
  if (!Reflect.getMetadataKeys) return []
  if (!Reflect.getMetadata) return []


  const indices = Reflect.getMetadataKeys(target, property)
    .filter((indice) => Object.values(ParamDecoratorEnum).includes(indice))
    .map(key => {
      return {
        index: Reflect.getMetadata(key, target, property),
        key
      }
    });

  const output_params: any[] = [];

  await Promise.all(
    indices.map(async ({ index, key }) => {
      const fn_transform = tranformer[key];
      const original_param = getParamByParamDecorator[key](args)
      const parse_param = await fn_transform(original_param);
      output_params[index] = parse_param;
    })
  )

  return output_params;
}