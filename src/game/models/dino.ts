import { DataTypes, type Sequelize } from "sequelize";

const {
    STRING,
    UUID,
    UUIDV4
} = DataTypes

function DinoModel(sequelize: Sequelize) {
    sequelize.define('Dino', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: {
            type: STRING,
            allowNull: false
        },
        scientific_name: {
            type: STRING
        },
        period: {
            type: STRING
        },
        diet: {
            type: STRING
        },
        width: {
            type: STRING
        },
        height: {
            type: STRING
        },
        weight: {
            type: STRING
        },
    })
}

export default DinoModel;