module.exports = (sequelize, DataTypes) => {
    const project = sequelize.define('project', {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check1: {
            type: DataTypes.BOOLEAN
        },
        check2: {
            type: DataTypes.BOOLEAN
        },
        check3: {
            type: DataTypes.BOOLEAN
        },
        check4: {
            type: DataTypes.BOOLEAN
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