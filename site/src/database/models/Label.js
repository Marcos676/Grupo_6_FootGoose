module.exports = (sequelize, dataType) => {

    const alias = "Labels";

    const cols = {
        id: {
            type: dataType.INTEGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true

        },
        label: {
            type: dataType.STRING(15),
            allowNull: true
        },

    }

    const config = {
        tableName: "label",
        timestamps: false,
    }

    const Label = sequelize.define(alias, cols, config)
    Label.associate = (models) => {
        Label.hasMany(models.Products, {
            as: "products",
            foreinkey: "label_id"
        })
    }
    return Label
}