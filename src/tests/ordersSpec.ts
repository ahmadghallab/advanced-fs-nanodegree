import { OrderModel } from "../models/orders";

const order = new OrderModel();

describe('Order Model', () => {
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