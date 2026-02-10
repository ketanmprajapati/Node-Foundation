const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");


router.get("/get-department", authMiddleware, departmentController.getDepartments);
router.post("/create-department", authMiddleware, isAdmin, departmentController.createDepartment);
router.post("/update-department/:id", authMiddleware, isAdmin, departmentController.updateDepartment);
router.post("/delete-department/:id", authMiddleware, isAdmin, departmentController.deleteDepartment);

module.exports = router;
