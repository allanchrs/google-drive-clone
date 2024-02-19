import { IUserRepository } from "src/database/interface/user-repository.interface";
import { Output } from "./output";
import { Input } from "./input";

export class CreateUser {
  constructor(
    private readonly _userRepository: IUserRepository
  ) { }

  async execute(input: Input): Promise<Output> {
    const user = await this._userRepository.save({
      name: input.name,
      email: input.email,
      passsword: input.password
    });

    return { data: user }
  }
}