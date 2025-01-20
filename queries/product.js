const connection = require('../db')
const express = require("express")
const router = express.Router();

// get All products
router.get('/getAll', (req, res) => {
	const select_all = "SELECT * FROM products;"
	connection.query(select_all, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json(result)
		}
	})
})

// get product by ID
router.get('/getById/:id', (req, res) => {
	const pid = req.params.id;
	const select_byId = "SELECT * FROM products WHERE pid = ?;"
	connection.query(select_byId, pid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				res.status(200).json(result)
			} else {
				res.status(404).json({ message: `${pid} doesn't exist` })
			}
		}
	})
})

// Inserting products
router.post('/add', (req, res) => {
	// const {pname, price} = req.body;
	const pname = req.body.pname;
	const price = req.body.price;

	const insert_query = "INSERT INTO products(pname, price) VALUES (?, ?)"
	connection.query(insert_query, [pname, price], (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json({ message: `${result.affectedRows} product was added..!` })
		}
		console.log(result);
	})
})

// removing product by ID
router.delete('/deleteById/:pid', (req, res) => {
	const pid = req.params.pid;

	const delete_query = "DELETE FROM products WHERE pid = ?"
	connection.query(delete_query, pid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.affectedRows != 0) {
				res.status(200).json({ message: `${result.affectedRows} product was added..!` })
			} else {
				res.status(404).json({ message: `${pid} doesn't exist` })
			}
		}
	})
})

// update product by ID
router.patch("/updateById/:pid", (req, res) => {
	const pid = req.params.pid;

	const select_byId = "SELECT * FROM products WHERE pid = ?;"
	connection.query(select_byId, pid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				const old_values = result[0]

				const updated_values = {...old_values, ...req.body}
				
				const values = [updated_values.pname, updated_values.price, pid]

				const update_query = "UPDATE products SET pname = ?, price = ? WHERE pid = ?"
				connection.query(update_query, values, (err, result) => {
					if (err) {
						res.status(400).json({message: err.sqlMessage})
					} else {
						if (result.changedRows != 0) {
							res.status(200).json({message: `${result.changedRows} product was updated..!`})
						} else {
							res.status(404).json({message: `${pid} doesn't updated`})
						}
					}
					console.log(result);
					
				})
			} else {
				res.status(404).json({ message: `${pid} doesn't exist` })
			}
		}
	})
})

module.exports = router