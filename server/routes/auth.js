import { Router } from "express";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { getRandomId, isValidEmail } from "../utils/global.js";
import { configDotenv } from 'dotenv'
import { verifyUser } from "../middleware/verifyUser.js";

const router = Router()
configDotenv()

const { JWT_SECRET_KEY } = process.env

const users = []

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const trimmedName = name.trim()

        if (trimmedName.length < 3 || trimmedName.length > 20) return res.status(400).json({ message: 'Name must be between 3 to 20 chars.', isError: true })
        if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email', isError: true })
        if (password.length < 6) return res.status(400).json({ message: 'Password must be greater than 6 chars.', isError: true })

        const hashedPassword = await hash(password, 10)

        const user = { uid: getRandomId(), name: trimmedName, email, password: hashedPassword }
        users.push(user)
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

        const user = users.find(u => u.email === email)
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
        const user = users.find(u => u.uid === uid)

        if (!user) return res.status(404).json({ message: "User not found", isError: true })

        const { password, ...userWithoutPassword } = user
        return res.status(200).json({ message: 'User Found', user: userWithoutPassword  })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: "Internal Error", isError: true })
    }
})


export { router as authRouter }