module.exports = (sequelize, dataType) => {

    const alias = "ProductsImages";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: dataType.STRING(40),
            allowNull: true
        },
    }

    const config = {
        tableName: "img_product",
        timestamps: false,
    }

    const ImgProduct = sequelize.define(alias, cols, config)
    ImgProduct.associate = (models) => {
        Img_product.hasMany(models.Products, {
            as: "products",
            foreingKey: "product_id"
        })
    }

    return ImgProduct
}