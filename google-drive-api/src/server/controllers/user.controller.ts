import { Body, Controller, Post, Req } from "@common/decorators";
import { IncomingMessage } from "http";

@Controller('users')
export class UserController {
  // private readonly createUser = new CreateUser(new UserRepository())

  @Post({ status: 201 })
  async create(
    @Body() body: any,
    @Req() req: IncomingMessage
  ): Promise<any> {
    return body;
  }
}