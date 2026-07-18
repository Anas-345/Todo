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

        if (!trimmedName) return res.status(400).json({ message: 'Name must be between 3 to 20 chars.', isError: true })
        if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email', isError: true })
        if (password.length < 6) return res.status(400).json({ message: 'Password must be greater than 6 chars.', isError: true })

        const duplicateEmail = await Users.findOne({ email })

        if (duplicateEmail) return res.status(400).json({ message: 'Email already exists', isError: true })

        const hashedPassword = await hash(password, 10)

        const user = { name: trimmedName, email, password: hashedPassword, uid:getRandomId() }
        await Users.create(user)

        return res.status(201).json({ message: 'User Registered successfully' })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", isError: true })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email', isError: true })

        const user = await Users.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found', isError: true })

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) return res.status(400).json({ message: 'Invalid Password', isError: true })

        const token = jwt.sign({ uid: user.uid }, JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", isError: true })
    }
})

router.get('/user', verifyUser, async (req, res) => {
    try {
        const { uid } = req
        const user = await Users.findOne({ uid }).select('-password')

        if (!user) return res.status(404).json({ message: "User not found", isError: true })

        return res.status(200).json({ message: 'User Found', user: user })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", isError: true })
    }
})


export { router as authRouter }