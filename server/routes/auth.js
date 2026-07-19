import { Router } from "express";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { getRandomId, isValidEmail, validateString } from "../utils/global.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { Users } from "../models/auth.js";

const router = Router()

const { JWT_SECRET_KEY } = process.env

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const trimmedName = validateString(name)

        if (!trimmedName) return res.status(400).json({ message: 'Name must be between 3 to 20 chars.', success: false })
        if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email', success: false })
        if (password.length < 6) return res.status(400).json({ message: 'Password must be greater than 6 chars.', success: false })

        const duplicateEmail = await Users.findOne({ email })

        if (duplicateEmail) return res.status(400).json({ message: 'Email already exists', success: false })

        const hashedPassword = await hash(password, 10)

        const user = { name: trimmedName, email, password: hashedPassword, uid:getRandomId() }
        await Users.create(user)

        return res.status(201).json({ message: 'User Registered successfully', success:true })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", success: false })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email', success: false })

        const user = await Users.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found', success: false })

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) return res.status(400).json({ message: 'Invalid Password', success: false })

        const token = jwt.sign({ uid: user.uid }, JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({ message: 'Login successful', token, success:true })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", success: false })
    }
})

router.get('/user', verifyUser, async (req, res) => {
    try {
        const { uid } = req
        const user = await Users.findOne({ uid }).select('-password')

        if (!user) return res.status(404).json({ message: "User not found", success: false })

        return res.status(200).json({ message: 'User Found', user: user, success: true })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", success: false })
    }
})


export { router as authRouter }