import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()
const { JWT_SECRET_KEY } = process.env

function verifyUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid or expired token', isError: true })
        const token = authHeader.split(' ')[1]
        const { uid } = jwt.verify(token, JWT_SECRET_KEY)
        req.uid = uid
        next()
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
}

export { verifyUser }