module.exports = (sequelize, dataType) => {
	
    const alias = "Location";
 
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

    const Label = sequelize.define(alias, cols, config)
    label.belongsTo(models.User, {
        as : "locations",
        foreinkey : "locations_id"
    })
 
    return Location
 }