// import { IncomingMessage, ServerResponse } from "http";
import 'reflect-metadata'
import { ParamDecoratorEnum } from '../enums/param-decorator.enum';

export const Body = () => {
  return (target: Object, key: string | symbol, index: number) => {
    Reflect.defineMetadata(ParamDecoratorEnum.BODY, index, target, key);
  };
}