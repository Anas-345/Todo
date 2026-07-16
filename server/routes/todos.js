import { Router } from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { getRandomId, validateString } from '../utils/global.js'

const router = Router()

const todos = []

router.post('/add', verifyUser, (req, res) => {
    try {
        const { uid } = req
        let { name, description, priority, privacy, schedule } = req.body
        name = validateString(name)
        description = validateString(description)
        if (!name || !description) return res.status(400).json({ message: 'Please fill the input fields correctly' })
        const todo = { name, description, priority, privacy, schedule, uid, id: getRandomId() }
        todos.push(todo)
        return res.status(201).json({ message: 'Todo created successfully', todo })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.get('/all', verifyUser, (req, res) => {
    try {
        const { uid } = req
        const { search } = req.query
        let filteredTodos = todos.filter(t => t.uid === uid)
        if (search) filteredTodos = filteredTodos.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
        return res.status(200).json({ message: 'Todo Loaded successfully', filteredTodos })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.get('/public', (req, res) => {
    try {
        const filteredTodos = todos.filter(t => t.privacy === 'public')
        return res.status(200).json({ message: 'Todo Loaded successfully', filteredTodos })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.put('/update', verifyUser, (req, res) => {
    try {
        const { uid } = req
        let { id, name, description, priority, privacy, schedule } = req.body

        const todoIndex = todos.findIndex(t => t.id === id)

        if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' })
        const findTodo = todos[todoIndex]
        if (uid !== findTodo.uid) return res.status(403).json({ message: "You don't have rights to delete this todo." })

        name = validateString(name)
        description = validateString(description)
        if (!name || !description) return res.status(400).json({ message: 'Please fill the input fields correctly' })


        todos[todoIndex] = { ...findTodo, name, description, priority, privacy, schedule }

        return res.status(200).json({ message: "Todo updated successfully" })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})

router.delete('/delete/:id', verifyUser, (req, res) => {
    try {
        const { uid } = req
        const { id } = req.params
        const todoIndex = todos.findIndex(t => t.id === id)

        if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' })
        const findTodo = todos[todoIndex]
        if (uid !== findTodo.uid) return res.status(403).json({ message: "You don't have rights to delete this todo." })
        todos.splice(todoIndex, 1)

        return res.status(204).end()
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Internal Error', isError: true })
    }
})


export { router as todoRouter }