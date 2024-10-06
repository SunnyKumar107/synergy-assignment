import { User } from '@/lib/definitions'
import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const deleteUserById = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const createNewUser = async (userData: User) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const updateUser = async (id: number, userData: User) => {
  const response = await axios.put(`${baseUrl}/${id}`, userData)
  return response.data
}

export default {
  getUsers,
  getUserById,
  deleteUserById,
  createNewUser,
  updateUser
}
