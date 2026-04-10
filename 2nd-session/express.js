const express = require('express')

const app = express()

const PORT = process.env.PORT ?? 3002

app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi página</h1>')
})

app.post('/pokemon', (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        res.status(201).json(data)
    }) 
})

app.listen(PORT, () => {
    console.log('server listening on port http://localhost:${PORT}');
})