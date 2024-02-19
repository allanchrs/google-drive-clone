import { FakeUserRepository } from "../../../../database/fake/user-repository.interface";
import { CreateUser } from "./crate-user.use-case"
import { userMock } from "../../../../database/fake/mock/entities/user.mock";
import { Input } from "./input";
import { faker } from '@faker-js/faker';

describe('#Create User', () => {
  let use_case: CreateUser;
  let _userRepository: FakeUserRepository;

  beforeEach(() => {
    _userRepository = new FakeUserRepository();
    use_case = new CreateUser(_userRepository);
  })

  const input: Input = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  it.each([
    {
      should: 'Should create a new user sucessfuly',
      input,
      setup: () => {
        _userRepository.save.mockResolvedValueOnce(userMock)
      },
      expeted: (output: any) => {
        expect(_userRepository.save).toHaveBeenCalledWith({
          name: input.name,
          email: input.email,
          passsword: input.password
        })
        expect(output).toMatchObject({ data: userMock })
      }
    }
  ])('$should', async ({ input, setup, expeted }) => {
    if (setup) setup();

    use_case.execute(input as unknown as Input).then(expeted).catch(expeted)
  })
})