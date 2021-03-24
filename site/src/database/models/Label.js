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
        img: {
            type: dataType.STRING(45),
        }

    }

    const config = {
        tableName: "label",
        timestamps: false,
        underscored: true
    }

    const Label = sequelize.define(alias, cols, config)
    Label.associate = (models) => {
        Label.hasMany(models.Products, {
            as: "products",
            foreinkey: "label_id",
            underscored: true
        })
    }
    return Label
}