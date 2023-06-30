const { Router } = require('express');
const {
    createModule,
    getModules,
    getModuleById,
    updateModuleById,
    deleteModuleById
} = require("../controllers/module.controller.js");
const VerifyAuthorization = require("../middleware/auth");
const { verificarRole } = require("../middleware/authRole");
const moduleRoutes = Router();


moduleRoutes.get("/", getModules)
moduleRoutes.get("/:moduleId", getModuleById)
moduleRoutes.post(
    "/createModule",
    VerifyAuthorization,
    verificarRole("user"), 
    createModule)

moduleRoutes.put(
    "/updateModule/:moduleId",
    VerifyAuthorization,
    verificarRole("user"),
    updateModuleById
    )
moduleRoutes.delete(
    "/deleteModule/:moduleId",
    VerifyAuthorization,
    verificarRole("user"), 
    deleteModuleById
    )

module.exports = moduleRoutes;