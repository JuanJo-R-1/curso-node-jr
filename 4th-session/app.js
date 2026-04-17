import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'

import movies from './movies.json'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

const app = express()
app.use(json())
app.use(cors({
    origin: (origin, callback) => {
       

        if(ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))
app.disable('x-powered-by')

 const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3004',
    'http://movies.com'
]

app.get('/movies', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    }

    const { genre } = req.query
    if (genre) {
        const filteredMovies = filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = find(movie => movie.id == id)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})


app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    }

    push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const {id} = req.params
    const movieIndex = findIndex(movie => movie.id == id)

    if (movieIndex == -1) {
        return res.status(404).json({message: 'Movie not found'})
    }

    const updateMovie ={
    ...movies[movieIndex],
    ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})
const PORT = process.env.PORT ?? 3004

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
}) 