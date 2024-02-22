import { HttpMethodEnum } from "../../enums"
import { baseHttpDecorator } from "./base.decorator"

export const Get = (path?: string) => {
  return baseHttpDecorator({ method: HttpMethodEnum.GET, path })
}