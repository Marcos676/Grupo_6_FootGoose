module.exports = (sequelize, dataType) => {

    const alias = "Carts";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: dataType.INTEGER(11),
            allowNull: true
        },
        product_id: {
            type: dataType.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "cart",
        timestamps: true,
        underscored: true
    }

    const Cart = sequelize.define(alias, cols, config)

    return Cart
}
