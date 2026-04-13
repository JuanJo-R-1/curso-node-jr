const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/movies', (req,res) => {
    const {genre} = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.at.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(movie => movie.id == id)
    if (movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID,
        ...result.data
    }
    
    movies.push(newMovie)
    res.staturs(201).json(newMovie)
})

const PORT = process.env.PORT ?? 3004

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})