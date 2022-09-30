// @ts-ignore
import Client from "../database";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserModel {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [b.first_name, b.last_name, b.password])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}