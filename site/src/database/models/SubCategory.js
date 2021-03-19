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
    }
 
    const config = {
            tableName: "sub_category",
                timestamps: false,
    }
 
    const Sub_Category = sequelize.define(alias, cols, config)
    Sub_Category.hasMany(models.Products, {
        as: "sub_category",
        foreingKey: "sub_category_id"
    })

    return sub_category
 }