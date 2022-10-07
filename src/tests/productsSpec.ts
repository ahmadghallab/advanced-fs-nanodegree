import { ProductModel } from "../models/products";

const product = new ProductModel();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  })

  it('create method should add an product', async () => {
    const result = await product.create({
      name: 'product 1',
      price: 5
    });
    expect(result).toEqual({
      id: 1,
      name: 'product 1',
      price: 5
    });
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([{
      id: 1,
      name: 'product 1',
      price: 5
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'product 1',
      price: 5
    });
  });
})