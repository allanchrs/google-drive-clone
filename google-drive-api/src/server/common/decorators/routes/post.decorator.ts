import { HttpMethodEnum } from "../../enums"
import { interceptor } from "../../interceptors/request.interceptor"
import { baseHttpDecorator } from "./base.decorator"



export const Post = (path?: string) => {
  return baseHttpDecorator({ method: HttpMethodEnum.POST, path, interceptor: interceptor })
}

