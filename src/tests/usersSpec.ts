import { UserModel } from "../models/users";

const user = new UserModel();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([]);
  })

  it('create method should add an user', async () => {
    const result = await user.create({
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
    expect(result).toEqual({
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([{
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(1);
    expect(result).toEqual({
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    });
  });
})