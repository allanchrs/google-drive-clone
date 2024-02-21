import { IncomingMessage, ServerResponse } from "http";
import { CreateUser } from "../../core/use-cases/user/create/crate-user.use-case";
import { UserRepository } from "../../database/implementation/user-repository.interface";
import { Body } from "../common/decorators/body.decorator";
import { Controller } from "../common/decorators/controller.decorator";
import { Post } from "../common/decorators/post.decorator";
import { Req } from "../common/decorators/request.decorator";
import { Res } from "../common/decorators/response.decorator";
import { Socket } from "../common/decorators/socket.decorator";
import { Server } from "socket.io";

@Controller('users')
export class UserController {
  // private readonly createUser = new CreateUser(new UserRepository())

  @Post()
  async create(
    @Socket() socket: Server,
  ): Promise<any> {
    return { test: 'aaa' }
    // return await this.createUser.execute(body);
  }
}