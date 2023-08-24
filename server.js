const express = require('express')
const { createServer } = require('http')
var cors = require('cors')

const app = express()
const server = createServer(app)

const clients = []

app.use(express.static('public'))

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log('pushing')
  clients.push(res)

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1)
  })
})

app.options('*', cors()) // include before other routes
app.post('/message', express.json(), (req, res) => {
  console.log({ reqBody: req.body })
  const { text } = req.body
  console.log({ text })
  clients.forEach((client) => {
    // write in each response of get requests on route '/events'
    client.write(`data:${JSON.stringify({ text })}\n\n`)
  })
  res.json({ success: true })
})

server.listen(8080, () => {
  console.log('SSE server is running on port 8080')
})
