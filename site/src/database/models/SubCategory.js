module.exports = (sequelize, dataType) => {

    const alias = "SubCategories";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        sub_category: {
            type: dataType.STRING(45),
            allowNull: true
        },
        category_id: {
            type: dataType.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "sub_category",
        timestamps: false,
    }

    const SubCategory = sequelize.define(alias, cols, config)
    SubCategory.associate = (models) => {
        SubCategory.hasMany(models.Products, {
            as: "products",
            foreingKey: "sub_category_id"
        })
        SubCategory.belongsTo(models.Categories, {
            as: "category",
            foreingKey: 'category_id'
        })
    }
    return SubCategory
}