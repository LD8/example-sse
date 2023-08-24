const express = require('express')
const { createServer } = require('http')
var cors = require('cors')

const app = express()
const server = createServer(app)

const clients = {}

// frontend call this route to get the SSE stream and subscribe to the client list
app.get('/events/:id', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  // IMPORTANT to allow CORS access since our backend service is on another port
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { id } = req.params
  // subscribe to clients list
  console.log(`subscribe to clients list No. ${id}`)
  let client = (clients[id] = clients[id] || [])
  client.push(res)
  console.log({ clients })

  req.on('close', () => {
    console.log(`Removing client No. ${id} from clients list `)
    client.splice(client.indexOf(res), 1)
  })
})

// include before other routes to handle preflight OPTION requests
app.options('*', cors())

// frontend call this route to send a message to all subscribers
app.post('/message/:id', express.json(), (req, res) => {
  const { text } = req.body
  const { id } = req.params
  console.log({ text, id })


  // broadcast to all clients
  clients[id].forEach((client) => {
    // broadcast to each subscriber
    // write in each response of get requests on route '/events'
    client.write(`data:${JSON.stringify({ text })}\n\n`)
  })

  // IMPORTANT to allow CORS access since our backend service is on another port
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json({ success: true })
})

server.listen(8080, () => {
  console.log('SSE server is running on port 8080')
})
