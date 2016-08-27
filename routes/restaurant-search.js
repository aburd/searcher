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

router.get('/', (req, res) => {
	res.send(req.method)
})

router.post('/', (req, res) => {
	let searchTerm = req.query.borough
	MongoClient.connect(url, (err, db) => {
		assert.equal(err, null)

		db.collection('restaurants').find({borough: searchTerm}).limit(10)
			.toArray((err, result) => {
				assert.equal(err, null)
				res.json(result)
			})
	})
})

module.exports = router