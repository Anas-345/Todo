import axios from "axios";
import notification from "../functions/notification";

const { VITE_API } = import.meta.env;

const authRoute = `${VITE_API}/auth`
const todoRoute = `${VITE_API}/todo`

export async function handleRegister(name, email, password) {
    try {
        const res = await axios.post(`${authRoute}/register`, {
            name,
            email,
            password,
        });
        notification(res.data)
        return res.data.success
    } catch (error) {
        notification(error.response.data)
        return error.response.data.success
    }
}

export async function handleLogin(email, password) {
    try {
        const res = await axios.post(`${authRoute}/login`, { email, password })
        notification(res.data)
        return res.data.token
    } catch (error) {
        notification(error.response.data)
        return false
    }
}

export async function handleProfile(token) {
    try {
        const res = await axios.get(`${authRoute}/user`, { headers: { Authorization: `Bearer ${token}` } })
        return res.data.user
    } catch (error) {
        return null
    }
}

export async function handlePublicTodos() {
    try {
        const res = await axios.get(`${todoRoute}/public`)
        return res.data.filteredTodos
    } catch (error) {
        return null
    }
}