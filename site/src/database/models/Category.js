module.exports = (sequelize, dataType) => {

    const alias = "Categories";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: dataType.STRING(30),
            allowNull: true
        },
    }

    const config = {
        tableName: "category",
        timestamps: false,
    }

    const Category = sequelize.define(alias, cols, config)
    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: "products",
            foreingKey: "category_id"
        })
        Category.hasMany(models.SubCategories, {
            as: "subCategory",
            foreingKey: category_id
        })
    }
    return Category
}