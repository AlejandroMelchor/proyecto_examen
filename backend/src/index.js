import express  from 'express'
import clienteRoutes from './routes/cliente.routes.js'
import cors from 'cors'

// se crea la url que estaremos utilizando para hacer las peticiones
const app = express()
app.use(express.json())
app.use(cors({origin: true, credentials: true}))

app.use('/api', clienteRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Resource not found'
    })
})

app.listen(3000)
console.log(`Server running on port ${3000}`)