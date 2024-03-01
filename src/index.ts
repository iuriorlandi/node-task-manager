import express from 'express'
import cors from 'cors'
import authenticationMiddleware  from './middleware/authenticationMiddleware'
import 'dotenv/config'
import applyMiddleware from './utils/applyMiddleware'
import tasks from './routes/tasks'
import applyRoutes from './utils/applyRoutes'

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
applyMiddleware([express.json(), authenticationMiddleware], app)
applyRoutes(tasks, app)


app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
})
