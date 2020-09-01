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
        check5: {
            type: DataTypes.BOOLEAN
        },
        check6: {
            type: DataTypes.BOOLEAN
        },
        check7: {
            type: DataTypes.BOOLEAN
        },
        check8: {
            type: DataTypes.BOOLEAN
        },
        check1Note: {
            type: DataTypes.STRING
        },
        check2Note: {
            type: DataTypes.STRING
        },
        check3Note: {
            type: DataTypes.STRING
        },
        check4Note: {
            type: DataTypes.STRING
        },
        check5Note: {
            type: DataTypes.STRING
        },
        check6Note: {
            type: DataTypes.STRING
        },
        check7Note: {
            type: DataTypes.STRING
        },
        check8Note: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return project;
}