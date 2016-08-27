'use strict'

const express = require('express')
const app = express()
const router = express.Router()
const assert = require('assert')
const $ = require('jquery')

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID
const url = 'mongodb://localhost:27017/test';

//escaping mechanism
RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

router.get('/', (req, res) => {
	res.send(req.method)
})

router.post('/', (req, res) => {

	// create a query object to hold searchtext and result
	let query = {
		text: req.query.borough,
		result: []
	}
	let searchReg = new RegExp( RegExp.escape(query.text), "gi") //return an escaped version of the search term

	MongoClient.connect(url, (err, db) => {
		assert.equal(err, null)
		// get my collection
		let restaurants = db.collection('restaurants')
		// find results
		restaurants.find( { borough: { $regex: searchReg } }).limit(10)
			.toArray((err, result) => {
				assert.equal(err, null)
				
				query.result = result
				res.json( JSON.stringify(query) )
			})
	})
})

module.exports = router