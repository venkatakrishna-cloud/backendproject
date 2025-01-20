const connection = require('../db')
const express = require("express")
const router = express.Router();

// get All customers
router.get('/getAll', (req, res) => {
	const select_all = "SELECT * FROM customers;"
	connection.query(select_all, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json(result)
		}
	})
})

// get customer by ID
router.get('/getById/:id', (req, res) => {
	const cid = req.params.id;
	const select_byId = "SELECT * FROM customers WHERE cid = ?;"
	connection.query(select_byId, cid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				res.status(200).json(result)
			} else {
				res.status(404).json({ message: `${cid} doesn't exist` })
			}
		}
	})
})

// Inserting customers
router.post('/add', (req, res) => {
	// const {first_name, last_name} = req.body;
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;

	const insert_query = "INSERT INTO customers(first_name, last_name) VALUES (?, ?)"
	connection.query(insert_query, [first_name, last_name], (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			res.status(200).json({ message: `${result.affectedRows} customer was added..!` })
		}
		console.log(result);
	})
})

// removing customer by ID
router.delete('/deleteById/:cid', (req, res) => {
	const cid = req.params.cid;

	const delete_query = "DELETE FROM customers WHERE cid = ?"
	connection.query(delete_query, cid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.affectedRows != 0) {
				res.status(200).json({ message: `${result.affectedRows} customer was deleted..!` })
			} else {
				res.status(404).json({ message: `${pid} doesn't exist` })
			}
		}
	})
})

// update customer by ID
router.patch("/updateById/:cid", (req, res) => {
	const cid = req.params.cid;

	const select_byId = "SELECT * FROM customers WHERE cid = ?;"
	connection.query(select_byId, cid, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				const old_values = result[0]

				const updated_values = {...old_values, ...req.body}
				
				const values = [updated_values.first_name, updated_values.last_name, cid]

				const update_query = "UPDATE customers SET first_name = ?, last_name = ? WHERE cid = ?"
				connection.query(update_query, values, (err, result) => {
					if (err) {
						res.status(400).json({message: err.sqlMessage})
					} else {
						if (result.changedRows != 0) {
							res.status(200).json({message: `${result.changedRows} customer was updated..!`})
						} else {
							res.status(404).json({message: `${cid} doesn't updated`})
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