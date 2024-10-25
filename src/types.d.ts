import type { NextFunction, Request, Response } from 'express'

export type Controller = (req: Request, res: Response, next?: NextFunction) => void
export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export interface RouteUnit {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  handler: Controller
  middlewares?: Middleware[]
}

export interface RouteGroup {
  middlewares?: Middleware[]
  routes: { [key: string]: RouteGroup | RouteUnit | (RouteUnit | RouteGroup)[] }
}

export type Routes = RouteGroup
