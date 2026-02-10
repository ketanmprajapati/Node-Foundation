"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [2, 100]
                }
            },

            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            role: {
                type: DataTypes.ENUM("ADMIN", "USER"),
                defaultValue: "USER"
            },

            departmentId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true
            },

            bio: {
                type: DataTypes.STRING(255),
                allowNull: true
            },

            profileImage: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: "Users"
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.Department, {
            foreignKey: "departmentId"
        });
    };

    return User;
};
