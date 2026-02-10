require("dotenv").config();
const express = require("express");
const db = require("./models");

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Node Foundation API Running");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/departments", require("./routes/department.routes.js"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/uploads", express.static("uploads"));

// Start Server
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
})();
