import routes from '@/routes.ts'
import type { Routes } from '@/types.d.ts'
import logger from '@/utils/logger.ts'
import { Express } from 'express'

function makeRoutes(app: Express) {
  const registerRoutes = (routes: Routes, basePath: string = '') => {
    if (routes.middlewares) {
      routes.middlewares.forEach((middleware) => app.use(basePath, middleware))
    }
    if (routes.routes) {
      Object.keys(routes.routes).forEach((path) => {
        let routeConfig = routes.routes[path]
        const fullPath = `${basePath}${path}`
        if ('routes' in routeConfig) {
          registerRoutes(routeConfig, fullPath)
        } else {
          routeConfig = routeConfig instanceof Array ? routeConfig : [routeConfig]
          routeConfig.forEach((routeConfig) => {
            const { method, handler } = routeConfig
            logger.info(`Registering route ${method.toUpperCase()} ${fullPath}`)
            app[method](fullPath, handler)
          })
        }
      })
    }
  }

  registerRoutes(routes)
}

export default makeRoutes
