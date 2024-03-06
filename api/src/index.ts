import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import { router } from './router'


 mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  const app = express()

  const port = 3001

  app.use(express.json())
  app.use(cors())

  app.use(router)

  app.listen(port, () => {
    console.log(`🚀 Server is running in http://localhost:${port}`)
    console.log('✅ Conectado ao MongDB')
  })
 }).catch(() => { console.log('❌ Erro ao se conectar com o MongoDB') })
