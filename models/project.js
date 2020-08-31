module.exports = (sequelize, DataTypes) => {
    const project = sequelize.define('project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return project;
}