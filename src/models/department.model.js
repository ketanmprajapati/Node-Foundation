"use strict";

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        "Department",
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                    len: [2, 100]
                }
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            tableName: "Departments"
        }
    );

    Department.associate = (models) => {
        Department.hasMany(models.User, {
            foreignKey: "departmentId"
        });
    };

    return Department;
};
