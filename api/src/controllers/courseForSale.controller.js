const { CourseForSale, Profile, User } = require("../db");
const getUserToken = require("../helpers/getUsertoken");
const { cursos, category } = require("../constants/data");

const postCreateCourseForSale = async (req, res) => {
  try {
    const { name, category, duration, description, images, price } = req.body;
    const user = await getUserToken(req);
    if(!name){
      return res.status(404).json({ error: "Name missing" });
    }
    if(!category){
      return res.status(404).json({ error: "Category missing" });
    }
    if(!duration){
      return res.status(404).json({ error: "Duration missing" });
    }
    if(!images){
      return res.status(404).json({ error: "Images missing" });
    }
    if(!price){
      return res.status(404).json({ error: "Price missing" });
    }
    const newCourse = await CourseForSale.create({
      name,
      category,
      duration,
      description,
      images,
      price,
      idProfile: user.idUser,
    });    
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseForSale = async (req, res) => {
  try {
    const courseAll = await CourseForSale.findAll({
      include: {
        model: Profile,
        attributes: { exclude: ["photo"] },
      },
    });
    const courseCount = await CourseForSale.count();
    res.send({ courseCount, courseAll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCourseForSale = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updateCourse = req.body;
    const user = await getUserToken(req);
    const updatedCourse = await CourseForSale.update(updateCourse, {
      where: {
        id: courseId,
        idProfile: user.idUser,
      },
    });
    if (updatedCourse[0] === 0) {
      res
        .status(400)
        .json({ error: "Course not found for the current user profile" });
    } else {
      res.send("update course successfully");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteCourseForSale = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = await getUserToken(req);
    const courseDelete = await CourseForSale.destroy({
      where: { id: courseId, idProfile: user.idUser },
    });
    if (courseDelete === 0) {
      return res
        .status(404)
        .json({ error: "Course not found for the current user profile" });
    } else {
      res.send("courses deleted");
    }
    res.json(courseDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourseForSaleById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await CourseForSale.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving course" });
  }
};

module.exports = {
  postCreateCourseForSale,
  getCourseForSale,
  deleteCourseForSale,
  updateCourseForSale,
  getCourseForSaleById
};
