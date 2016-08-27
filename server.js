const express = require('express')
const app = express()
const restaurantSearch = require('./routes/restaurant-search.js')
const $ = require('jquery')

const router = express.Router()

var port = process.env.PORT || 3000

// Make ./public the directory to use
console.log(__dirname + '../public')
app.use(express.static(__dirname + '/public'))

// app.get('/', (req, res) => {
// 	console.log(`${req.method} request at ${req.originalUrl}`)
// 	res.send()
// })

app.use('/search', restaurantSearch)

app.listen(port, function(){
	console.log('Now listening on port ' + port)
})