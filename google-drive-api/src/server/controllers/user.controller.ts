import { Body, Controller, Post } from "@common/decorators";

@Controller('users')
export class UserController {
  // private readonly createUser = new CreateUser(new UserRepository())

  @Post({ status: 201 })
  async create(
    @Body() body: any,
  ): Promise<any> {
    return body;
  }
}