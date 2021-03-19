module.exports = (sequelize, dataType) => {
	
    const alias = "Users";
 
    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: dataType.STRING(45),
            allowNull: true
        },
        last_name: {
            type: dataType.STRING(45),
            allowNull: true
        },
        email: {
            type: dataType.STRING(45),
            allowNull: true,
            unique: true
        },
        password: {
            type: dataType.STRING(100),
            allowNull: true
        },
        address: {
            type:dataType.STRING(70)
        },
        tel: {
            type: dataType.INTEGER
        },
        img: {
            type:dataType.STRING(45),
            allowNull: true,
            defaultValue: 'undefined.PNG'
        },
        admin: {
            type:dataType.INTEGER(1),
            allowNull: true,
            defaultValue: 0
        },
        location_id: {
            type: dataType.INTEGER
        }
    }	
    const config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config)   
        
        Users.associate = (models) => {

        User.belongsTo(models.locations, {
            as: "location",
            foreingKey: "location_id"
        })

        User.belongsToMany(models.Products,{
            as: 'productCart',
            through: 'cart',
            foreingKey: 'user_id',
            otherKey: 'product_id'
        })

        User.belongsToMany(models.Products,{
            as: 'favorites',
            through: 'favorites',
            foreingKey: 'user_id',
            otherKey: 'product_id'
        })
    }
    return User
 }