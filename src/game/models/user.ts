import { DataTypes, type Sequelize } from "sequelize";

const {
    STRING,
    UUID,
    UUIDV4
} = DataTypes

function UserModel(sequelize: Sequelize) {
    sequelize.define('User', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: {
            type: STRING,
            allowNull: false
        },
        lastname: {
            type: STRING
        }
    });
};

export default UserModel;