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
    Category.hasMany(models.Products, {
        as: "category",
        foreingKey: "category_id"
    })

    return category
 }