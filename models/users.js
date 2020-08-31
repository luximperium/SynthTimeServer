module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profilePicSrc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
    return Users;
}