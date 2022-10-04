import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import routes from './routes'
import errorHandler from './middlewares/error-handlers'
import NotFoundError from './errors/not-found-error'
import cookieSession from 'cookie-session'

const app = express()
const port = 3002
app.set("trust proxy", true);
app.use(json());

app.use(cookieSession({
  name: 'session',
  signed: false,
  secure: false,
  keys: ['abc123'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/api', routes)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}!`))

export default app
