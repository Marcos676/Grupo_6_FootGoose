module.exports = (sequelize, dataType) => {

    const alias = "Products";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataType.STRING(70),
            allowNull: true
        },
        description: {
            type: dataType.STRING(300),
            allowNull: true
        },
        cuantity: {
            type: dataType.INTEGER,
            allowNull: true,
        },
        price: {
            type: dataType.DECIMAL(7,2),
            allowNull: true
        },
        discount: {
            type: dataType.INTEGER(3)
        },
        sold: {
            type: dataType.INTEGER,
            defaulValue: 0
        },
        expiration: {
            type: dataType.DATE
        },
        final_price: {
            type: dataType.DECIMAL(7,2),
            allowNull: true,
        },
        created_at: {
            type: dataType.DATE,
            defaultValue: null
        },
        updated_at: {
            type: dataType.DATE,
            defaultValue: null
        },
        sub_category_id: {
            type: dataType.INTEGER,
            allowNull: true
        },
        label_id: {
            type: dataType.INTEGER,
            allowNull: true
        }
    }
    const config = {
        tableName: "products",
        timestamps: true,
        underscored: true
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {

        Product.belongsTo(models.SubCategories, {
            as: "subCategory",
            foreingKey: "sub_category_id",
            underscored: true
        })
        Product.belongsTo(models.Labels, {
            as: "label",
            foreingKey: "label_id",
            underscored: true
        })
        Product.hasMany(models.ProductsImages, {
            as: "images",
            foreingKey: "product_id",
            underscored: true
        })
        Product.belongsToMany(models.Users,{
            as: 'cartProduct',
            through: 'cart',
            foreingKey: 'product_id',
            otherKey: 'favorite_id',
            underscored: true
        })
        Product.belongsToMany(models.Users,{
            as: 'favoriteOfUser',
            through: 'favorites',
            foreingKey: 'product_id',
            otherKey: 'user_id',
            underscored: true
        })
    }
    return Product
}