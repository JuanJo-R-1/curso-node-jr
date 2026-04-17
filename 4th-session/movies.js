import { object, string, number, array, enum } from 'zod'

const movieSchema = object({
    title: string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required.'
    }),
    year: number().int().min(1900).max(2026),
    director: string(),
    duration: number().int().positive(),
    rate: number().min(0).max(10).default(5),
    poster: string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: array(
        enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama',
            'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

function validateMovie(input) {
    return movieSchema.safeParse(input)
}

function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input)
}

export default { validateMovie, validatePartialMovie }