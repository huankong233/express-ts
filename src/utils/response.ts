import type { Response } from 'express'

export function response(res: Response, data: any, code: number, message: string) {
  return res.status(code).json({
    code,
    message,
    data
  })
}

export function success(res: Response, data: any = null) {
  return response(res, data, 200, 'success')
}

export function failure(res: Response, message = 'failure', code = 500, data: any = null) {
  return response(res, data, code, message)
}
