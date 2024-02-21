// import { IncomingMessage, ServerResponse } from "http";
import 'reflect-metadata'
import { ParamDecoratorEnum } from '../enums/param-decorator.enum';

export const Req = () => {
  return (target: Object, key: string | symbol, index: number) => {
    Reflect.defineMetadata(ParamDecoratorEnum.REQ, index, target, key);
  };
}