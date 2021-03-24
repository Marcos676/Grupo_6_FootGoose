module.exports = (sequelize, dataType) => {

    const alias = "ProductsImages";

    const cols = {
        id: {
            type: dataType.INTEGER(11),
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        img_name: {
            type: dataType.STRING(40),
        },
        product_id: {
            type: dataType.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "img_product",
        timestamps: false,
         underscored: true
    }

    const ImgProduct = sequelize.define(alias, cols, config)

    return ImgProduct
}