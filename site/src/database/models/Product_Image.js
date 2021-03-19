module.exports = (sequelize, dataType) => {
	
    const alias = "Product_Image";
 
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
 
    const Img_product = sequelize.define(alias, cols, config)
    Img_product.hasMany(models.Products, {
        as: "img_name",
        foreingKey: "product_id"
    })

    return Img_product
 }