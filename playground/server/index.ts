import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'

dotenv.config({
    quiet: false,
    debug: true,
    encoding: 'utf-8',
})

const app = express()
app.get('/', (req: Request, res: Response) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>Twiggle Playground</title>
    </head>
    <body>
        <div id="root">
            <h1>Hello World</h1>
        </div>
        <script
            type="module"
            src="/src/main.tsx"
        ></script>
    </body>
</html>
`)
})

const { PORT, HOST } = process.env

app.listen(Number(PORT), HOST as string, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})
