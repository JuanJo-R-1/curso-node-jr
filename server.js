const http = require('node:http')
const {findAvailablePort} = require('./free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log('request received', req.url);
    res.end('Los odio a todos lol')
})

server.listen(desiredPort, () => {
    console.log('server listening on port http://localhost:${desiredPort}')
})
