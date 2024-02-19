import { User } from "../../../../database/entities/user.entity";
import { faker } from '@faker-js/faker';

export const userMock: Partial<User> = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  passsword: faker.internet.password()
}