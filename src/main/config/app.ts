import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'
import { setupFirebaseConfig } from '@/main/config/firebase'
import express from 'express'

const app = express()

setupMiddlewares(app)
setupFirebaseConfig(app)
setupRoutes(app)

export { app }
