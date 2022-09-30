import { User, UserModel } from "../models/users";

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
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([{
      id: 1,
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(1);
    expect(result).toEqual({
      id: 1,
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
  });

  it('delete method should remove the user', async () => {
    user.delete(1);
    const result = await user.index()

    expect(result).toEqual([]);
  });
})