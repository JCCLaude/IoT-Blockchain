import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/api:5000',
})

export const getID = id => api.get(`/co/${id}`)

const apis = {
    getID
}

export default apis