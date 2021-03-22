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
            defaultValue: 'undefined.PNG'
        },
        admin: {
            type:dataType.INTEGER(1),
            defaultValue: 0
        },
        zone: {
            type: dataType.STRING(45)
        },
        locality: {
            type: dataType.STRING(45)
        }
    }	
    const config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config)   
        
        User.associate = (models) => {

        User.belongsToMany(models.Products,{
            as: 'productCart',
            through: 'cart',
            foreingKey: 'user_id',
            otherKey: 'product_id'
        })

        User.belongsToMany(models.Products,{
            as: 'favorite',
            through: 'favorites',
            foreingKey: 'user_id',
            otherKey: 'product_id'
        })
    }
    return User
 }