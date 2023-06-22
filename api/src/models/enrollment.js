const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Enrollment",
    {
      id_enrollment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      id_course: {
        type: DataTypes.INTEGER,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      course_score: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Enrollment",
      timestamps: false,
    }
  );
};
