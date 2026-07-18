import { Router } from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { getRandomId, validateString } from '../utils/global.js'
import { Todos } from '../models/todo.js'

const router = Router()

router.post('/add', verifyUser, async (req, res) => {
    try {
        const { uid } = req
        let { name, description, priority, privacy, schedule } = req.body
        name = validateString(name)
        description = validateString(description)

        if (!name || !description) return res.status(400).json({ message: 'Please fill the input fields correctly' })

        const todo = { name, description, priority, privacy, schedule, uid, id:getRandomId() }
        await Todos.create(todo)
        return res.status(201).json({ message: 'Todo created successfully', todo })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.get('/all', verifyUser, async (req, res) => {
    try {
        const { uid } = req
        const { search } = req.query
        let filteredTodos = await Todos.find({ uid })
        if (search) filteredTodos = filteredTodos.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
        return res.status(200).json({ message: 'Todo Loaded successfully', filteredTodos })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.get('/public', async (req, res) => {
    try {
        const filteredTodos = await Todos.find({ privacy: 'public' })
        return res.status(200).json({ message: 'Todo Loaded successfully', filteredTodos })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.put('/update', verifyUser, async (req, res) => {
    try {
        const { uid } = req
        let { id, name, description, priority, privacy, schedule } = req.body

        name = validateString(name)
        description = validateString(description)
        if (!name || !description) return res.status(400).json({ message: 'Please fill the input fields correctly' })

        const updatedTodo = await Todos.findOneAndUpdate(
            { id, uid },
            { name, description, priority, privacy, schedule },
            { returnDocument: 'after', runValidators: true }
        )

        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found.', isError: true })
        return res.status(200).json({ message: "Todo updated successfully", updatedTodo })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.delete('/delete/:id', verifyUser, async(req, res) => {
    try {
        const { uid } = req
        const { id } = req.params

        const deletedTodo = await Todos.findOneAndDelete(
            { id, uid }
        )

        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found', isError: true })

        return res.status(204).end()
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})


export { router as todoRouter }