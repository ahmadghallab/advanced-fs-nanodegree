import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import routes from './routes'
import errorHandler from './middlewares/error-handlers'
import NotFoundError from './errors/not-found-error'

const app = express()
app.use(json())
const port = 3002

app.use('/api', routes)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}!`))

export default app
