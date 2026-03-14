import User from "../models/User";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '20' });
    return token;
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exists." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, password: hashedPassword
        })

        const token = generateToken(newUser._id)
        newUser.password = undefined;
        return res.status(201).json({ success: true, message: 'User created successfully.', token, user: newUser })

    } catch (error) {
        console.error(" -> ", error);
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "Invalid email or password." })
        }
        if (!userExist.comparePassword(password)) {
            return res.status(400).json({ success: false, message: "Invalid email or password." })
        }

        const token = generateToken(userExist._id)
        userExist.password = undefined;
        return res.status(201).json({ success: true, message: 'User created successfully.', token, user: userExist })

    } catch (error) {
        console.error(" -> ", error);
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}

export const getUserById = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }

        user.password = undefined;
        return res.status(201).json({ success: true, data: user })

    } catch (error) {
        console.error(" -> ", error);
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}

export const getUserResume = async (req, res) => {
    try {

        const userId = req.userId;

        const userResume = await Resume.find({ userId });
        if (!userResume) {
            return res.status(400).json({ success: false, message: "User not found." })
        }
        return res.status(201).json({ success: true, data: userResume })

    } catch (error) {
        console.error(" -> ", error);
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}