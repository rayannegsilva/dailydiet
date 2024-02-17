import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'

 mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  const app = express()

  const port = 3001

  app.use(express.json())
  app.use(cors())

  app.listen(port, () => {
    console.log(`🚀 Server is running in http://localhost:${port}`)
    console.log('✅ Conectado ao MongDB')
  })
 })
