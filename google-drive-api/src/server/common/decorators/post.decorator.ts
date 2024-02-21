import { HttpMethodEnum } from "../enums/http-method.enum";
import { interceptor } from "../interceptors/request.interceptor";
import { httpBaseDecorator } from "./base.decorator";

export const Post = (path?: string) => {
  return httpBaseDecorator({ method: HttpMethodEnum.POST, path, interceptor: interceptor })
}

