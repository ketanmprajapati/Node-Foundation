const db = require("../models");
const Department = db.Department;

/**
 * Create Department
 */
async function createDepartment(req, res) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Department name is required" });
        }

        const existing = await Department.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ message: "Department already exists" });
        }

        const department = await Department.create({ name });

        return res.status(201).json({
            message: "Department created successfully",
            department
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Get All Departments
 */
async function getDepartments(req, res) {
    try {
        const departments = await Department.findAll();
        return res.json(departments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


async function updateDepartment(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        department.name = name;
        await department.save();

        res.json({
            message: "Department updated",
            department
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteDepartment(req, res) {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        await department.destroy();

        res.json({ message: "Department deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};
