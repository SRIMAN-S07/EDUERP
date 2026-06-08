    const express = require("express");

    const router = express.Router();

    const jwt = require("jsonwebtoken");

    const Student =
    require("../models/Student");

    const Staff =
    require("../models/Staff");

    // LOGIN
    router.post("/login", async (req, res) => {

    try {

        const { username, password } =
        req.body;

        // 🔥 ADMIN LOGIN
        if (
        username === "admin" &&
        password === "admin123"
        ) {

        const token = jwt.sign(

            {
            role: "admin"
            },

            "secretkey",

            {
            expiresIn: "1d"
            }
        );

        return res.json({
            token,
            role: "admin"
        });

        }

        // 🔥 STUDENT LOGIN
        const student =
        await Student.findOne({
            studentId: username
        });

        if (
        student &&
        student.password === password
        ) {

        const token = jwt.sign(

            {
            id: student._id,
            role: "student"
            },

            "secretkey",

            {
            expiresIn: "1d"
            }
        );

        return res.json({

            token,

            role: "student",

            student

        });

        }

        // 🔥 STAFF LOGIN
        const staff =
        await Staff.findOne({
            staffId: username
        });

        if (
        staff &&
        staff.password === password
        ) {

        const token = jwt.sign(

            {
            id: staff._id,
            role: "staff"
            },

            "secretkey",

            {
            expiresIn: "1d"
            }
        );

        return res.json({

            token,

            role: "staff",

            staff

        });

        }

        // INVALID
        res.status(401).json({
        error: "Invalid Credentials"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
        error: "Server Error"
        });

    }

    });

    module.exports = router;