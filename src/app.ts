import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './Model/DataSource.ts'
import logger from './utils/logger.ts'
import router from './utils/routers.ts'

// 数据库
await AppDataSource.initialize()

const app = express()
app.use(express.json())
app.use((req, _res, next) => {
  logger.info(`Get Request ${req.method} ${req.url}`)
  next()
})
router(app)

const port = process.env.APP_PORT ?? 1337
app.listen(port, () => logger.info(`App is running at http://localhost:${port}`))
