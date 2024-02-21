import { HttpMethodEnum } from "../enums/http-method.enum";
import { httpBaseDecorator } from "./base.decorator";

export const Get = (path?: string) => {
  return httpBaseDecorator({ method: HttpMethodEnum.GET, path })
}