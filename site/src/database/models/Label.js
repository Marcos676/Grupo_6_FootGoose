module.exports = (sequelize, dataType) => {
	
    const alias = "Label";
 
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
    label.hasMany(models.Products, {
        as : "labels",
        foreinkey : "label_id"
    })
 
    return Label
 }