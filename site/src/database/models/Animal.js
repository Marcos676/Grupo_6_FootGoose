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
        img: {
            type: dataType.INTEGER(45),
            allowNull: true
        }
    }

    const config = {
        tableName: "animal",
        timestamps: false,
        underscored: true
    }

    const Animal = sequelize.define(alias, cols, config)
    Animal.associate = (models) => {

        Animal.hasMany(models.Categories, {
            as: "category",
            foreingKey: "animal_id",
            underscored: true
        })
    }

    return Animal
}
