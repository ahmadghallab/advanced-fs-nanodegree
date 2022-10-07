// @ts-ignore
import Client from "../database";
import { OrderModel } from "../models/orders";
import { ProductModel } from "../models/products";
import { UserModel } from "../models/users";

const user = new UserModel();
const product = new ProductModel();
const order = new OrderModel();

describe('Order Model', () => {

  beforeAll(async () => {
    user.create({
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
    product.create({
      name: 'product 1',
      price: 5
    })
  });
  
  afterAll(async () => {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n';
  
    await conn.query(sql);
    conn.release();
  })
  
  it('should have an current order by user method', () => {
    expect(order.currrentOrderByUser).toBeDefined();
  });

  it('create method should create an order', async () => {
    const result = await order.create({
      product_id: 1,
      user_id: 1,
      quantity: 5
    });
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      user_id: 1,
      quantity: 5,
      status: "active"
    });
  });

  it('should return current active order by user', async () => {
    const result = await order.currrentOrderByUser(1);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5
    });
  });
})