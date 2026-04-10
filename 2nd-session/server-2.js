const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html', 'Charset=utf-8')
    if (req.url === '/') {
        res.end('<h1>Bienvenido al Inicio</h1>')
    } else if (req.url == '/imagecool.png') {
        fs.readFile('./Merc-Benz.png', (err, data) => {
            if (err) {
                res,statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    }else if (req.url == '/contacto') {
        res.statusCode = 200 // Ok
        res.end('<h1>Contacto</h1>')

    } else {
        res.statusCode = 404 // Ok
        res.end('<h1>404</h1>')
    }
}
const server = http.createServer(processRequest)
server.listen(desiredPort, () => {
    console.log('server listening on port http://localhost:${desiredPort}')
})
