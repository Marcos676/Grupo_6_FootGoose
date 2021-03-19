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
            type: dataType.INTEGER,
            allowNull: true
        },
        discount: {
            type: dataType.INTEGER(100)
        },
        sold: {
            type: dataType.INTEGER,
            defaulValue: 0
        },
        expiration: {
            type: dataType.DATE
        },
        final_price: {
            type: dataType.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: dataType.DATE,
            allowNull: true,
            defaultValue: NULL
        },
        updated_at: {
            type: dataType.DATE,
            allowNull: true,
            defaultValue: NULL
        },
        animal_id: {
            type: dataType.INTEGER,
            allowNull: true
        },
        category_id: {
            type: dataType.INTEGER,
            allowNull: true
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
        tableName: "products"
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {

        Product.belongsTo(models.animals, {
            as: "animal",
            foreingKey: "animal_id"
        })
        Product.belongsTo(models.categories, {
            as: "category",
            foreingKey: "category_id"
        })
        Product.belongsTo(models.subCategories, {
            as: "subCategory",
            foreingKey: "sub_category_id"
        })
        Product.belongsTo(models.labels, {
            as: "label",
            foreingKey: "label_id"
        })
        Product.hasMany(models.images, {
            as: "images",
            foreingKey: "product_id"
        })
        Product.belongsToMany(models.users,{
            as: 'cartProduct',
            through: 'cart',
            foreingKey: 'product_id',
            otherKey: 'favorite_id'
        })

        Product.belongsToMany(models.Users,{
            as: 'favoriteOfUser',
            through: 'favorites',
            foreingKey: 'product_id',
            otherKey: 'user_id'
        })
    }
    return Product
}