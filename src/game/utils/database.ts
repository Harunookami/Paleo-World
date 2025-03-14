import { Sequelize } from "sequelize";
import process from "node:process";

import UserModel from "../models/user.ts";
import DinoModel from "../models/dino.ts";

const MODELS = [
    UserModel,
    DinoModel
]

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_SCHE
} = process.env

export const sequelize = new Sequelize(DB_SCHE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    for (const model of MODELS) {
        model(sequelize)
    }
} catch (error) {
    console.error('Unable to connect to the database:', error.message);
}