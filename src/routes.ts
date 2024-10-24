import TestController from '@/controllers/TestController.ts'
import responseHeader from '@/middleware/ResponseHeader.ts'
import type { Routes } from '@/types.ts'

const routes: Routes = {
  middlewares: [responseHeader],
  routes: {
    '/api/v1/user': {
      routes: {
        '/': [
          { method: 'get', handler: TestController.get },
          { method: 'put', handler: TestController.put },
          { method: 'delete', handler: TestController.delete }
        ],
        '/item': { method: 'get', handler: TestController.getItem }
      }
    }
  }
}

export default routes
