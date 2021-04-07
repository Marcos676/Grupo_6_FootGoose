module.exports = (sequelize, dataType) => {

    const alias = "Favorites";

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
        tableName: "favorites",
        timestamps: true,
        underscored: true
    }

    const Favorite = sequelize.define(alias, cols, config)
   /*  Animal.associate = (models) => {

        Animal.hasMany(models.Categories, {
            as: "category",
            foreingKey: "animal_id",
            underscored: true
        })
    } */

    return Favorite
}
