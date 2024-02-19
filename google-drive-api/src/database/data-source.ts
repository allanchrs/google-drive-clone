import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "./entities/user.entity";
import { Media } from "./entities/media.entity";
import { resolve } from "path";

export const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT) ?? '5432',
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  schema: process.env.DB_SCHEMA as string,
  entities: [User, Media],
  logging: process.env.DB_LOGGING === 'true',
  migrations: [resolve(__dirname, 'migrations', '*{.ts,.js}')],
})