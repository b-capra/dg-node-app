const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile('./views/new-page.html', { root: __dirname })
})

app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html')
})

app.get('/hello(.html)?', (req, res, next) => {
  console.log('Attempted to load hello.html')
  next()
}, (req, res) => {
  res.send('Hello World!')
})

app.get('/*', (req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))