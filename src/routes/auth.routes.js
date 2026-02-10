const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/create-department", authMiddleware, departmentController.createDepartment);
router.get("/get-department", authMiddleware, departmentController.getDepartments);

module.exports = router;
