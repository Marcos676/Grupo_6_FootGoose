module.exports = (sequelize, dataType) => {

    const alias = "Locations";

    const cols = {
        id: {
            type: dataType.INTEGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true

        },
        location: {
            type: dataType.STRING(45),
            allowNull: true
        },

    }

    const config = {
        tableName: "location",
        timestamps: false,
    }

    const Location = sequelize.define(alias, cols, config)
    Location.associate = (models) => {
        label.belongsTo(models.User, {
            as: "users",
            foreinkey: "locations_id"
        })
    }

    return Location
}