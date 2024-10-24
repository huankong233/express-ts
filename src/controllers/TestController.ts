import { UserRepository } from '@/Model/DataSource.ts'
import { failure, success } from '@/utils/response.ts'
import type { Request, Response } from 'express'

export default {
  get: async (_req: Request, res: Response) => {
    const data = await UserRepository.find()
    success(res, data)
  },
  getItem: async (req: Request, res: Response) => {
    const id = req.query.id
    if (!id || typeof id !== 'string') return failure(res, 'id is required')
    const data = await UserRepository.findOneBy({ id: parseFloat(id) })
    success(res, data)
  },
  put: async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return failure(res, 'username and password are required')
    }
    const user = await UserRepository.save({ username, password })
    success(res, user)
  },
  delete: async (req: Request, res: Response) => {
    const id = req.body.id
    if (!id || typeof id !== 'number') return failure(res, 'id is required')
    const data = await UserRepository.findOneBy({ id })
    if (!data) return failure(res, 'user not found')
    await UserRepository.remove(data)
    success(res)
  }
}
