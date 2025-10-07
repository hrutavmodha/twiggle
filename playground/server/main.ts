import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({
    encoding: 'latin1',
    quiet: false,
    debug: true,
    override: false,
})
const app = express()

console.log('Process.Env is:\n', process.env)

app.use(cors({
    origin: process.env.FRONTEND_ORIGINS,
    methods: [
        'GET',
        'POST'
    ]
}))

app.listen(
    Number(process.env.PORT),
    process.env.HOST as string,
    () => {
        console.log(`Server is running at: http://${process.env.HOST}:${process.env.PORT}/`)
    }
)