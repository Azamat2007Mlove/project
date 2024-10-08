const express = require('express')
const productSchema = require('../models/ProductSchema')
require('dotenv').config()
const router = express.Router()

// unfiltered products
router.get('/', async (req, res) => {
	try {
		const products = await productSchema.find({}).limit(12)
		res.status(200).send({ message: products })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})
// get data for certainly product

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const product = await productSchema.findOne({ _id: id })
		if (!product)
			res.status(404).send({ message: "Current product hasn't found" })
		res
			.status(200)
			.send({
				message: product,
				prikol: 'https://youtu.be/dQw4w9WgXcQ?si=VmPKJbE76mDZdE2C',
			})
	} catch (error) {
		res.status(500).send({ message: error })
	}
})

// show more
router.get('/more', async (req, res) => {
	try {
		const amount = req.query.amount
		const products = await productSchema.find({}).limit(amount + 12)
		res.status(200).send({ message: products })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})

// filter products
router.post('/filter', async (req, res) => {
	try {
		const filters = req.body
		Object.keys(filters).forEach(key => {
			if (key != 'chosen') filters[key] = { $in: filters[key] }
		})
		console.log(filters)
		const filteredProducts = await productSchema.find(filters).limit(12)
		console.log(filteredProducts)
		res.status(200).send({ message: filteredProducts })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})
module.exports = router
