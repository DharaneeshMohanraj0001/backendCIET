const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user) {
    return jwt.sign({ id: user._id, name: user.name, rollNo: user.rollNo, dept: user.dept, year: user.year },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );
}

exports.registerUser = async(req, res) => {
    try {
        const { name, rollNo, dept, year, password } = req.body;
        const rollRegex = /^(?=.*[A-Z])[A-Z0-9]+$/;

        if (!name || !rollNo || !dept || !year || !password) {
            return res.status(400).json({ message: "All fields required" });

        }
        if (!rollRegex.test(rollNo)) {

            return res.status(400).json({
                message: "Roll Number must contain only CAPITAL letters and numbers"
            });
        }

        const exist = await User.findOne({ rollNo });
        if (exist) return res.status(409).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            rollNo,
            dept,
            year,
            password: hashed,
        });
        if (exist) {
            return res.status(409).json({
                success: false,
                message: "User Already exists"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Registered ✅",
            user: { id: user._id, name: user.name, rollNo: user.rollNo, dept: user.dept, year: user.year },
            token: createToken(user),
        });

    } catch (err) {
        return res.status(500).json({ message: "Register failed", error: err.message });
    }
};

exports.loginUser = async(req, res) => {
    try {
        const { rollNo, password } = req.body;

        const user = await User.findOne({ rollNo });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        return res.json({
            message: "Login success ✅",
            user: { id: user._id, name: user.name, rollNo: user.rollNo, dept: user.dept, year: user.year },
            token: createToken(user),
        });
    } catch (err) {
        return res.status(500).json({ message: "Login failed", error: err.message });
    }
};