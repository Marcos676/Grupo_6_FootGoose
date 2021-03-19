module.exports = (sequelize, dataType) => {

    const alias = "Animals";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        animal: {
            type: dataType.STRING(30),
            allowNull: true
        },
    }

    const config = {
        tableName: "animal",
        timestamps: false,
    }

    const Animal = sequelize.define(alias, cols, config)
    Animal.associate = (models) => {

        Animal.hasMany(models.Products, {
            as: "products",
            foreingKey: "animal_id"
        })
    }

    return Animal
}
