import { CreateUser } from "../../core/use-cases/user/create/crate-user.use-case";
import { Controller } from "../routes/decorators/controller.decorator";
import { UserRepository } from "../../database/implementation/user-repository.interface";
import { Body } from "../routes/decorators/body.decorator";
import { Post } from "../routes/decorators/post.decorator";

@Controller('users')
export class UserController {
  // private readonly createUser = new CreateUser(new UserRepository())

  @Post()
  async create(
    @Body() body: { AiiSimm: string },
    aaa: any, ccc: any
  ): Promise<any> {
    console.log({ body })

    return { test: 'aaa' }
    // return await this.createUser.execute(body);
  }
}